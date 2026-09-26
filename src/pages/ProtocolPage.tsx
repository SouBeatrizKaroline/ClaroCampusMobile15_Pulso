import { useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Phone, AlertTriangle, ShieldCheck } from 'lucide-react'
import { PROTOCOLS } from '@/data/protocols'
import { useApp } from '@/context/AppContext'
import { useSpeech } from '@/hooks/use-speech'
import { VoiceAssistantBar } from '@/components/VoiceAssistantBar'
import { ProtocolIcon } from '@/components/ProtocolIcon'
import { RhythmGuide } from '@/components/RhythmGuide'
import { ActionIllustration } from '@/components/ActionIllustration'
import { guidanceSpeech, nextStepIndex } from '@/lib/protocol-navigation'
import { SOURCES } from '@/data/sources'

export default function ProtocolPage() {
  const { id = '' } = useParams()
  // A new route always starts a fresh guide, including history and microphone state.
  return <Guide key={id} id={id}/>
}
function Guide({ id }: { id: string }) {
  const protocol = PROTOCOLS[id]
  const voice = useSpeech()
  const { emergencyNumbersOpen, setEmergencyNumbersOpen, readAloud, setReadAloud } = useApp()
  const [index, setIndex] = useState(0)
  const [history, setHistory] = useState<number[]>([])
  const [rate, setRate] = useState(0.92)
  const [message, setMessage] = useState('')
  const [handsFree, setHandsFree] = useState(false)
  const heading = useRef<HTMLHeadingElement>(null)
  const commandRef = useRef<(command: string) => void>(() => {})
  const step = protocol?.steps[index]
  const text = protocol ? guidanceSpeech(protocol, index) : ''
  const { speak, stopSpeaking, stopListening } = voice
  useEffect(() => {
    stopListening(); setMessage('')
    heading.current?.focus({ preventScroll: true })
    if (readAloud && text) speak(text, rate)
    else stopSpeaking()
  }, [text, readAloud, rate, speak, stopSpeaking, stopListening])
  const { startListening, isSpeaking, isListening, error } = voice
  useEffect(() => {
    if (!handsFree || isSpeaking || isListening || error || emergencyNumbersOpen || document.hidden) return
    const timer = window.setTimeout(() => startListening(command => commandRef.current(command), true), 500)
    return () => window.clearTimeout(timer)
  }, [handsFree, isSpeaking, isListening, error, emergencyNumbersOpen, startListening, index])
  useEffect(() => {
    const pause = () => {
      if (document.hidden) { setHandsFree(false); setReadAloud(false); stopListening(); stopSpeaking() }
    }
    document.addEventListener('visibilitychange', pause)
    return () => document.removeEventListener('visibilitychange', pause)
  }, [setReadAloud, stopListening, stopSpeaking])
  const toggleHandsFree = () => {
    const enabled = !handsFree
    setHandsFree(enabled); setReadAloud(enabled)
    if (enabled) speak(text, rate)
    else { stopListening(); stopSpeaking() }
  }
  useEffect(() => { document.title = protocol ? `${protocol.title} · Pulso` : 'Orientação não encontrada · Pulso'; window.scrollTo(0, 0) }, [protocol])
  const next = (target?: number) => {
    if (!protocol) return
    const destination = nextStepIndex(protocol, index, target)
    if (destination === index) {
      const prompt = step?.choices ? 'Diga o número da opção que descreve o que você observa. ' + step.choices.map((choice, i) => `Opção ${i + 1}: ${choice.text}.`).join(' ') : 'Mantenha os cuidados indicados. Diga repetir para ouvir novamente.'
      setMessage(prompt); if (handsFree) speak(prompt, rate)
      return
    }
    stopSpeaking(); stopListening(); setHistory(previous => [...previous, index]); setIndex(destination)
  }
  const back = () => {
    if (!history.length) return
    stopSpeaking(); stopListening(); setIndex(history[history.length - 1]); setHistory(previous => previous.slice(0, -1))
  }
  commandRef.current = command => {
    if (command === 'help') { setHandsFree(false); stopListening(); speak('Ligue 192 e coloque no viva-voz. O botão de ligação está na tela.', rate); setEmergencyNumbersOpen(true); return }
    if (command === 'next') { next(); return }
    if (command === 'back') { back(); return }
    if (command === 'repeat') { speak(text, rate); return }
    if (command === 'stop') { setHandsFree(false); stopListening(); stopSpeaking(); setReadAloud(false); return }
    if (command === 'failed') { setMessage('Ligue 192 no viva-voz para receber orientação. Não se coloque em risco.'); speak('Ligue 192 no viva-voz para receber orientação. Não se coloque em risco.', rate); return }
    if (command.startsWith('choice-')) {
      const choiceIndex = Number(command.slice(-1)) - 1
      if (step?.choices?.[choiceIndex]) { next(step.choices[choiceIndex].nextStepId); return }
    }
    const prompt = 'Não entendi com segurança. Diga “repetir”, “próximo passo”, “voltar”, ou “opção” e o número desejado.'
    setMessage(prompt); if (handsFree) speak(prompt, rate)
  }
  if (!protocol || !step) return <div className="page-width empty-state"><h1>Orientação não encontrada</h1><Link className="button" to="/">Voltar ao início</Link></div>
  const final = step.isFinal || index === protocol.steps.length - 1
  return <div className="guide-page">
    <div className="guide-width"><Link to="/" className="text-link guide-back"><ArrowLeft size={17}/> Todas as orientações</Link>
      <div className="guide-alert"><Phone size={22}/><span>{protocol.initialAlert}</span><button onClick={() => { stopSpeaking(); stopListening(); setEmergencyNumbersOpen(true) }}>Pedir ajuda <ArrowUpRightIcon/></button></div>
      <div className="guide-heading"><span className="protocol-icon critical"><ProtocolIcon id={id}/></span><div><p className="eyebrow">ORIENTAÇÃO PASSO A PASSO</p><h1>{protocol.title}</h1>{protocol.audience && <p>{protocol.audience}</p>}</div></div>
      <article className="step-panel"><div className="step-meta"><span>ETAPA {String(index + 1).padStart(2, '0')}</span><span>{step.choices ? 'Observe antes de escolher' : final ? 'Mantenha os cuidados' : 'Uma ação de cada vez'}</span></div>
        <h2 ref={heading} tabIndex={-1}>{step.title}</h2><p className="main-instruction">{step.mainInstruction}</p><ul className="step-detail step-checklist">{step.detailedText.split(/(?<=[.!?])\s+/).map((instruction, i) => <li key={i}>{instruction}</li>)}</ul>
        {step.warningNote && <div className="warning-note"><AlertTriangle size={21}/><p>{step.warningNote}</p></div>}
        <ActionIllustration key={`illustration-${id}-${step.id}`} protocolId={id} stepId={step.id}/>
        {step.hasRhythmMetronome && <RhythmGuide key={`${id}-${step.id}`}/>}
        {step.relatedProtocol && <Link className="related-guide" to={`/emergencia/${step.relatedProtocol}`}>Abrir: {PROTOCOLS[step.relatedProtocol]?.title} <ArrowRight size={17}/></Link>}
        <div className="step-actions">{step.choices ? step.choices.map((choice, i) => <button className="choice-button" aria-label={`Opção ${i + 1}: ${choice.text}`} key={choice.nextStepId} onClick={() => next(choice.nextStepId)}><span>{i + 1}</span>{choice.text}<ArrowRight size={18}/></button>) : !final ? <button className="button button-red" onClick={() => next()}>Próxima etapa <ArrowRight size={18}/></button> : <div className="continue-care"><ShieldCheck size={20}/><p>Permaneça com a pessoa e siga o atendimento de emergência. Este guia não confirma que o risco passou.</p></div>}</div>
        <div className="step-bottom"><button className="text-link" onClick={back} disabled={!history.length}><ArrowLeft size={16}/> Etapa anterior</button><button className="text-link" onClick={() => commandRef.current('failed')}>Não consigo realizar</button></div>
      </article>
      <div className="guide-sources"><strong>Base da orientação</strong><p>Revisão de conteúdo: setembro de 2026. Informação educativa; não é diagnóstico ou validação clínica individual.</p>{(protocol.sources || []).map(key => SOURCES[key] && <a key={key} href={SOURCES[key].url} target="_blank" rel="noreferrer">{SOURCES[key].title} ↗</a>)}<Link to="/sobre">Sobre a revisão e os limites</Link></div>
    </div>
    <VoiceAssistantBar voice={voice} text={text} rate={rate} setRate={setRate} autoRead={readAloud} setAutoRead={setReadAloud} handsFree={handsFree} toggleHandsFree={toggleHandsFree} message={message} onCommand={command => commandRef.current(command)}/>
  </div>
}
function ArrowUpRightIcon() { return <ArrowRight size={16}/> }
