import { useEffect, useRef, useState } from 'react'
import { Activity } from 'lucide-react'
export function RhythmGuide() {
  const [active, setActive] = useState(false)
  const [error, setError] = useState('')
  const context = useRef<AudioContext | null>(null)
  useEffect(() => {
    if (!active) return
    const audio = context.current
    if (!audio) return
    let nextBeat = audio.currentTime
    const timer = window.setInterval(() => {
      if (nextBeat < audio.currentTime - 0.2) nextBeat = audio.currentTime
      while (nextBeat < audio.currentTime + 0.1) {
        const oscillator = audio.createOscillator(); const gain = audio.createGain()
        oscillator.connect(gain); gain.connect(audio.destination)
        oscillator.frequency.value = 740
        gain.gain.setValueAtTime(0.12, nextBeat)
        gain.gain.exponentialRampToValueAtTime(0.001, nextBeat + 0.06)
        oscillator.start(nextBeat); oscillator.stop(nextBeat + 0.07)
        nextBeat += 60 / 110
      }
    }, 25)
    const onVisibility = () => { if (document.hidden) setActive(false) }
    document.addEventListener('visibilitychange', onVisibility)
    return () => { clearInterval(timer); document.removeEventListener('visibilitychange', onVisibility); void audio.suspend() }
  }, [active])
  useEffect(() => () => { void context.current?.close() }, [])
  const toggle = async () => {
    if (active) { setActive(false); return }
    try { context.current ||= new AudioContext(); await context.current.resume(); setError(''); setActive(true) } catch { setError('Áudio indisponível. Mantenha 100 a 120 compressões por minuto.') }
  }
  return <div className="rhythm-guide"><Activity size={24}/><div><strong>Ritmo de compressão</strong><p>110 batidas por minuto · Não interrompa a RCP para usar o site.</p>{error && <p role="status">{error}</p>}</div><button className="button small" aria-pressed={active} onClick={toggle}>{active ? 'Parar ritmo' : 'Ouvir ritmo'}</button></div>
}
