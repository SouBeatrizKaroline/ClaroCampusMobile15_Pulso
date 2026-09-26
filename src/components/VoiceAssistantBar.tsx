import { Mic, MicOff, Volume2, Square, RotateCcw } from 'lucide-react'
import { useSpeech } from '@/hooks/use-speech'
interface Props {
  voice: ReturnType<typeof useSpeech>
  onCommand: (command: string) => void
  text: string
  rate: number
  setRate: (rate: number) => void
  autoRead: boolean
  setAutoRead: (value: boolean) => void
  message: string
}
export function VoiceAssistantBar({ voice, onCommand, text, rate, setRate, autoRead, setAutoRead, message }: Props) {
  return <section className="voice-bar" aria-label="Controles de voz"><div className="voice-bar-inner">
    <div className="voice-controls"><span className="voice-label">PULSO VOZ</span>
      <button className="button small" disabled={!voice.isSpeechSupported} onClick={() => voice.isSpeaking ? voice.stopSpeaking() : voice.speak(text, rate)}>{voice.isSpeaking ? <Square size={17}/> : <Volume2 size={18}/>} {voice.isSpeaking ? 'Parar leitura' : 'Ouvir'}</button>
      <button className={`button small ${voice.isListening ? 'listening' : ''}`} onClick={() => voice.isListening ? voice.stopListening() : voice.startListening(onCommand)} aria-pressed={voice.isListening}>{voice.isListening ? <MicOff size={18}/> : <Mic size={18}/>} {voice.isListening ? 'Parar escuta' : 'Falar comando'}</button>
      <button className="icon-button" aria-label="Repetir orientação" disabled={!voice.isSpeechSupported} onClick={() => voice.speak(text, rate)}><RotateCcw size={19}/></button>
      <label className="speed-label">Ritmo <select aria-label="Velocidade da leitura" value={rate} onChange={e => setRate(Number(e.target.value))}><option value={0.75}>Mais devagar</option><option value={0.92}>Natural</option><option value={1.1}>Mais rápido</option></select></label>
      <label className="auto-read"><input type="checkbox" checked={autoRead} onChange={e => setAutoRead(e.target.checked)} disabled={!voice.isSpeechSupported}/> Ler próximos passos</label>
    </div>
    <p className="voice-status" role="status">{voice.error || (voice.isListening ? 'Ouvindo um comando… Diga “próximo passo”, “repetir”, “voltar”, “ajuda” ou “opção 1”.' : message || (voice.recognizedText ? `Você disse: “${voice.recognizedText}”.` : 'Toque para falar. A voz pode usar internet. Nenhuma ligação é feita automaticamente.'))}</p>
  </div></section>
}
