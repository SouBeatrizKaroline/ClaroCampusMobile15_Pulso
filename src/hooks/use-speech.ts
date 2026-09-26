import { useCallback, useEffect, useRef, useState } from 'react'
import { parseVoiceCommand } from '@/lib/voice-commands'

interface Recognition {
  lang: string; continuous: boolean; interimResults: boolean
  onstart: (() => void) | null; onend: (() => void) | null
  onerror: ((event: { error: string }) => void) | null
  onresult: ((event: { results: { [index: number]: { [index: number]: { transcript: string; confidence: number } } } }) => void) | null
  start(): void; abort(): void
}
type SpeechWindow = Window & { SpeechRecognition?: new () => Recognition; webkitSpeechRecognition?: new () => Recognition }

export function useSpeech() {
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [recognizedText, setRecognizedText] = useState('')
  const [error, setError] = useState('')
  const recognitionRef = useRef<Recognition | null>(null)
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null)
  const generation = useRef(0)
  const supported = typeof window !== 'undefined'
  const isSpeechSupported = supported && 'speechSynthesis' in window
  const RecognitionClass = supported ? ((window as SpeechWindow).SpeechRecognition || (window as SpeechWindow).webkitSpeechRecognition) : undefined
  const stopListening = useCallback(() => {
    const current = recognitionRef.current
    recognitionRef.current = null
    if (current) { current.onstart = null; current.onresult = null; current.onerror = null; current.onend = null; current.abort() }
    setIsListening(false)
  }, [])
  const stopSpeaking = useCallback(() => {
    generation.current += 1
    if ('speechSynthesis' in window) window.speechSynthesis.cancel()
    utteranceRef.current = null
    setIsSpeaking(false)
  }, [])
  const speak = useCallback((text: string, rate = 0.92) => {
    stopListening(); stopSpeaking()
    if (!('speechSynthesis' in window)) { setError('Leitura em voz alta indisponível neste navegador. As orientações continuam na tela.'); return }
    setError('')
    const token = generation.current
    const chunks = text.match(/[^.!?]+[.!?]*/g) || [text]
    const read = (index: number) => {
      if (token !== generation.current || index >= chunks.length) { if (token === generation.current) setIsSpeaking(false); return }
      const utterance = new SpeechSynthesisUtterance(chunks[index].trim())
      utterance.lang = 'pt-BR'; utterance.rate = rate
      const voices = window.speechSynthesis.getVoices()
      utterance.voice = voices.find(v => v.lang === 'pt-BR' && v.localService) || voices.find(v => v.lang === 'pt-BR') || voices.find(v => v.lang.startsWith('pt')) || null
      utterance.onstart = () => { if (token === generation.current) setIsSpeaking(true) }
      utterance.onend = () => read(index + 1)
      utterance.onerror = event => {
        if (token !== generation.current) return
        setIsSpeaking(false)
        if (event.error !== 'canceled' && event.error !== 'interrupted') setError('Não foi possível reproduzir o áudio. Toque em Ouvir para tentar novamente.')
      }
      utteranceRef.current = utterance
      window.speechSynthesis.speak(utterance)
    }
    read(0)
  }, [stopListening, stopSpeaking])
  const startListening = useCallback((onCommand?: (command: string, transcript: string) => void) => {
    stopListening(); stopSpeaking(); setError(''); setRecognizedText('')
    if (!RecognitionClass) { setError('Este navegador não reconhece voz. Use a busca e os botões.'); return }
    if (!window.isSecureContext) { setError('O microfone precisa de uma conexão HTTPS. Use os botões nesta página.'); return }
    const recognition = new RecognitionClass()
    recognitionRef.current = recognition
    recognition.lang = 'pt-BR'; recognition.continuous = false; recognition.interimResults = false
    recognition.onstart = () => setIsListening(true)
    recognition.onend = () => { if (recognitionRef.current === recognition) { recognitionRef.current = null; setIsListening(false) } }
    recognition.onerror = event => {
      setIsListening(false)
      const messages: Record<string, string> = {
        'not-allowed': 'Microfone bloqueado. Permita o acesso nas configurações do navegador ou use os botões.',
        'audio-capture': 'Não encontramos um microfone disponível.',
        network: 'O reconhecimento de voz está sem conexão. Use os botões.',
        'no-speech': 'Não ouvi uma fala. Toque no microfone e tente novamente.',
        'service-not-allowed': 'O serviço de voz está indisponível neste navegador.',
      }
      if (event.error !== 'aborted') setError(messages[event.error] || 'Não foi possível reconhecer a fala. Use os botões.')
    }
    recognition.onresult = event => {
      const result = event.results[0][0]
      const transcript = result.transcript.trim()
      stopListening(); setRecognizedText(transcript)
      if (result.confidence > 0 && result.confidence < 0.55) { setError('Não entendi com segurança. Repita ou use os botões.'); return }
      onCommand?.(parseVoiceCommand(transcript), transcript)
    }
    try { recognition.start() } catch { stopListening(); setError('Não foi possível iniciar o microfone. Tente novamente ou use os botões.') }
  }, [RecognitionClass, stopListening, stopSpeaking])
  useEffect(() => {
    const loadVoices = () => window.speechSynthesis?.getVoices()
    loadVoices()
    window.speechSynthesis?.addEventListener('voiceschanged', loadVoices)
    return () => { window.speechSynthesis?.removeEventListener('voiceschanged', loadVoices); stopListening(); stopSpeaking() }
  }, [stopListening, stopSpeaking])
  return { speak, stopSpeaking, isSpeaking, startListening, stopListening, isListening, recognizedText, error, isSpeechSupported, isRecognitionSupported: Boolean(RecognitionClass) }
}
