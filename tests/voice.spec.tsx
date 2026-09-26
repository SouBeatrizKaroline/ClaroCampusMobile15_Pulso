import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { act, cleanup, fireEvent, render, renderHook, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { useSpeech } from '../src/hooks/use-speech'
import { AppProvider } from '../src/context/AppContext'
import ProtocolPage from '../src/pages/ProtocolPage'

class RecognitionMock {
  static last: RecognitionMock
  lang = ''; continuous = true; interimResults = true
  onstart: (() => void) | null = null
  onend: (() => void) | null = null
  onerror: ((event: { error: string }) => void) | null = null
  onresult: ((event: unknown) => void) | null = null
  abort = vi.fn()
  constructor() { RecognitionMock.last = this }
  start() { this.onstart?.() }
  result(text: string, confidence = .99) { this.onresult?.({ results: [[{ transcript: text, confidence }]] }) }
}
class UtteranceMock {
  text: string
  onstart?: () => void
  onend?: () => void
  onerror?: (event: unknown) => void
  constructor(text: string) { this.text = text }
}
let utterances: UtteranceMock[]
beforeEach(() => {
  utterances = []
  vi.stubGlobal('SpeechRecognition', RecognitionMock)
  vi.stubGlobal('SpeechSynthesisUtterance', UtteranceMock)
  vi.stubGlobal('isSecureContext', true)
  vi.stubGlobal('speechSynthesis', { getVoices: () => [{ lang: 'pt-BR', localService: true }], cancel: vi.fn(), speak: (u: UtteranceMock) => { utterances.push(u); u.onstart?.() }, addEventListener: vi.fn(), removeEventListener: vi.fn() })
  vi.spyOn(window, 'scrollTo').mockImplementation(() => {})
})
afterEach(() => { cleanup(); vi.useRealTimers(); vi.unstubAllGlobals(); vi.restoreAllMocks() })

describe('speech lifecycle', () => {
  it('does not ask for the microphone or speak on mount', () => {
    const { result } = renderHook(() => useSpeech())
    expect(result.current.isListening).toBe(false)
    expect(utterances).toHaveLength(0)
  })
  it('listens for one phrase and stops before the command runs', () => {
    const { result } = renderHook(() => useSpeech())
    const command = vi.fn()
    act(() => result.current.startListening(command))
    const mic = RecognitionMock.last
    expect(mic.lang).toBe('pt-BR'); expect(mic.continuous).toBe(false)
    act(() => mic.result('Próximo passo'))
    expect(mic.abort).toHaveBeenCalled()
    expect(command).toHaveBeenCalledWith('next', 'Próximo passo')
    expect(result.current.isListening).toBe(false)
  })
  it('rejects uncertain recognition rather than choosing a clinical answer', () => {
    const { result } = renderHook(() => useSpeech()); const command = vi.fn()
    act(() => result.current.startListening(command))
    act(() => RecognitionMock.last.result('opção dois', .2))
    expect(command).not.toHaveBeenCalled()
    expect(result.current.error).toContain('segurança')
  })
  it('reports denied permission and network problems', () => {
    const { result } = renderHook(() => useSpeech())
    act(() => result.current.startListening())
    act(() => RecognitionMock.last.onerror?.({ error: 'not-allowed' }))
    expect(result.current.error).toContain('Microfone bloqueado')
    act(() => result.current.startListening())
    act(() => RecognitionMock.last.onerror?.({ error: 'network' }))
    expect(result.current.error).toContain('sem conexão')
  })
  it('cancels microphone before speaking and ignores stale audio callbacks', () => {
    const { result } = renderHook(() => useSpeech())
    act(() => result.current.startListening())
    const mic = RecognitionMock.last
    act(() => result.current.speak('Primeira frase. Segunda frase.'))
    expect(mic.abort).toHaveBeenCalled()
    const stale = utterances[0]
    act(() => result.current.speak('Novo passo.'))
    act(() => stale.onend?.())
    expect(utterances.map(u => u.text)).toEqual(['Primeira frase.', 'Novo passo.'])
  })
  it('cleans up recognition on unmount', () => {
    const { result, unmount } = renderHook(() => useSpeech())
    act(() => result.current.startListening())
    const mic = RecognitionMock.last
    unmount()
    expect(mic.abort).toHaveBeenCalled(); expect(mic.onresult).toBe(null)
  })
  it('offers an actionable fallback when recognition is not supported', () => {
    vi.stubGlobal('SpeechRecognition', undefined)
    const { result } = renderHook(() => useSpeech())
    act(() => result.current.startListening())
    expect(result.current.isRecognitionSupported).toBe(false)
    expect(result.current.error).toContain('Use a busca e os botões')
  })
})

function renderGuide(id = 'engasgo') {
  return render(<MemoryRouter initialEntries={[`/emergencia/${id}`]}><AppProvider><Routes><Route path="/emergencia/:id" element={<ProtocolPage/>}/></Routes></AppProvider></MemoryRouter>)
}
it('a severe choking answer opens the severe branch, and back restores the question', () => {
  renderGuide()
  fireEvent.click(screen.getByRole('button', { name: 'Opção 2: Tosse fraca, não fala ou não respira' }))
  expect(screen.getByRole('heading', { name: 'Alterne 5 golpes e 5 compressões' })).toBeTruthy()
  fireEvent.click(screen.getByRole('button', { name: 'Etapa anterior' }))
  expect(screen.getByRole('heading', { name: 'A pessoa consegue tossir?' })).toBeTruthy()
})
it('voice cannot skip a question; a clear voice choice proceeds without a touch confirmation', () => {
  renderGuide()
  fireEvent.click(screen.getByRole('button', { name: 'Falar comando' }))
  act(() => RecognitionMock.last.result('próximo passo'))
  expect(screen.getByRole('heading', { name: 'A pessoa consegue tossir?' })).toBeTruthy()
  fireEvent.click(screen.getByRole('button', { name: 'Falar comando' }))
  act(() => RecognitionMock.last.result('opção dois'))
  expect(screen.getByRole('heading', { name: 'Alterne 5 golpes e 5 compressões' })).toBeTruthy()
  fireEvent.click(screen.getByRole('button', { name: 'Falar comando' }))
  act(() => RecognitionMock.last.result('opção dois'))
  expect(screen.getByRole('heading', { name: 'Depois que o objeto sair' })).toBeTruthy()
  expect(screen.queryByRole('button', { name: 'Concluir Orientações' })).toBe(null)
})

function finishReading() {
  act(() => {
    let position = utterances.length - 1
    while (position < utterances.length) utterances[position++].onend?.()
  })
}
it('hands-free reads, listens, follows a choice and listens again without another click', () => {
  vi.useFakeTimers()
  renderGuide()
  fireEvent.click(screen.getByRole('button', { name: 'Ativar mãos livres' }))
  finishReading()
  act(() => vi.advanceTimersByTime(600))
  act(() => RecognitionMock.last.result('opção dois'))
  expect(screen.getByRole('heading', { name: 'Alterne 5 golpes e 5 compressões' })).toBeTruthy()
  finishReading()
  act(() => vi.advanceTimersByTime(600))
  act(() => RecognitionMock.last.result('opção dois'))
  expect(screen.getByRole('heading', { name: 'Depois que o objeto sair' })).toBeTruthy()
  finishReading()
  act(() => vi.advanceTimersByTime(600))
  act(() => RecognitionMock.last.result('pausar voz'))
  expect(screen.getByRole('button', { name: 'Ativar mãos livres' })).toBeTruthy()
})
it('hands-free repeats uncertain speech and retries silence without advancing', () => {
  vi.useFakeTimers()
  renderGuide()
  fireEvent.click(screen.getByRole('button', { name: 'Ativar mãos livres' }))
  finishReading()
  act(() => vi.advanceTimersByTime(600))
  const firstMic = RecognitionMock.last
  act(() => firstMic.onerror?.({ error: 'no-speech' }))
  act(() => vi.advanceTimersByTime(600))
  expect(RecognitionMock.last).not.toBe(firstMic)
  act(() => RecognitionMock.last.result('opção dois', .2))
  expect(screen.getByRole('heading', { name: 'A pessoa consegue tossir?' })).toBeTruthy()
  expect(utterances.at(-1)?.text).toContain('Não entendi')
})
