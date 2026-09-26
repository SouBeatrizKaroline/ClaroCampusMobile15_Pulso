import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ArrowRight, Search, Mic, MicOff, ShieldCheck, Phone, AudioLines, ArrowUpRight, X, BookOpen } from 'lucide-react'
import { PROTOCOLS, CARD_ORDER } from '@/data/protocols'
import { ProtocolIcon } from '@/components/ProtocolIcon'
import { useApp } from '@/context/AppContext'
import { useSpeech } from '@/hooks/use-speech'
import { normalizeText } from '@/lib/voice-commands'
export default function Index() {
  const { setIdentificationOpen, setEmergencyNumbersOpen } = useApp()
  const voice = useSpeech()
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('Todas')
  const location = useLocation()
  useEffect(() => { if (location.hash === '#situacoes') document.getElementById('situacoes')?.scrollIntoView() }, [location])
  const matches = CARD_ORDER.map(id => PROTOCOLS[id]).filter(p => {
    const matchesQuery = normalizeText(`${p.title} ${p.summary} ${(p.keywords || []).join(' ')}`).includes(normalizeText(search))
    return matchesQuery && (filter === 'Todas' || (filter === 'Urgentes' ? p.urgencyLevel === 'critica' : filter === 'Bebês e crianças' ? p.id === 'emergencia-bebe' : ['acidente', 'incendio', 'afogamento', 'choque-eletrico', 'queda-fratura'].includes(p.id)))
  })
  const listen = () => voice.isListening ? voice.stopListening() : voice.startListening((command, text) => {
    if (command === 'help') { setEmergencyNumbersOpen(true); return }
    setSearch(text); setFilter('Todas'); document.getElementById('situacoes')?.scrollIntoView({ behavior: 'smooth' })
  })
  return <div>
    <section className="hero page-width">
      <div className="hero-copy"><p className="eyebrow"><span/> CUIDADO QUE COMEÇA COM VOCÊ</p><h1>O primeiro cuidado.<br/><em>Um passo de cada vez.</em></h1><p className="hero-description">Saiba como ajudar enquanto o socorro chega. Orientações diretas, no seu ritmo — para ler ou ouvir.</p><div className="hero-actions"><button className="button button-red" onClick={() => setIdentificationOpen(true)}>Preciso de orientação <ArrowRight size={19}/></button><a className="text-link" href="#situacoes">Ver situações <ArrowRight size={17}/></a></div><p className="hero-note"><ShieldCheck size={17}/> Sem cadastro. Acesso livre. Ajuda em português.</p></div>
      <div className="first-minute"><div className="first-minute-top"><span className="eyebrow">ANTES DE COMEÇAR</span><span className="minute-mark">01<span> / PRIMEIRO MINUTO</span></span></div><div className="pulse-art" aria-hidden="true"><svg viewBox="0 0 400 100"><path d="M0 52H100L117 41L135 66L158 10L188 92L213 36L235 52H400"/></svg><div className="pulse-heart"><ProtocolIcon id="parada-cardiaca"/></div></div><h2>Você também precisa<br/>estar em segurança.</h2><p>Observe o local. Afaste-se de fogo, fios elétricos e trânsito antes de ajudar.</p><a href="tel:192" className="minute-call"><span><Phone size={17}/> Acione o SAMU</span><strong>192 <ArrowUpRight size={18}/></strong></a></div>
    </section>
    <section className="page-width" id="situacoes" aria-labelledby="situations-title">
      <div className="section-heading"><div><p className="eyebrow">ENCONTRE A ORIENTAÇÃO</p><h2 id="situations-title">O que está acontecendo?</h2></div><span className="section-aside">Escolha a situação mais próxima do que você vê.</span></div>
      <div className="search-row"><div className="search-field"><Search size={21}/><input aria-label="Buscar situação" placeholder="Busque por engasgo, queimadura, queda…" value={search} onChange={e => setSearch(e.target.value)}/>{search && <button aria-label="Limpar busca" onClick={() => setSearch('')}><X size={18}/></button>}</div><button className={`button voice-search ${voice.isListening ? 'listening' : ''}`} onClick={listen} aria-pressed={voice.isListening}>{voice.isListening ? <MicOff size={20}/> : <Mic size={20}/>}<span>{voice.isListening ? 'Parar escuta' : 'Buscar por voz'}</span></button></div>
      <div role="status" className="voice-feedback">{voice.error || (voice.isListening ? 'Estou ouvindo. Diga o nome da situação, por exemplo: “engasgo”.' : voice.recognizedText ? `Você disse: “${voice.recognizedText}”. Escolha uma orientação abaixo.` : '')}</div>
      <div className="filter-row" aria-label="Filtrar situações">{['Todas', 'Urgentes', 'Bebês e crianças', 'Acidentes e resgate'].map(label => <button key={label} onClick={() => setFilter(label)} aria-pressed={filter === label} className={filter === label ? 'selected' : ''}>{label}</button>)}<span>{matches.length} orientações</span></div>
      <div className="protocol-grid">{matches.map(p => <Link className="protocol-card" key={p.id} to={`/emergencia/${p.id}`}><div className="card-top"><span className={`protocol-icon ${p.urgencyLevel === 'critica' ? 'critical' : ''}`}><ProtocolIcon id={p.id}/></span>{p.urgencyLevel === 'critica' && <span className="urgent-tag"><span/> AÇÃO IMEDIATA</span>}</div><h3>{p.title}</h3><p>{p.summary}</p><span className="card-link">O que fazer <ArrowUpRight size={18}/></span></Link>)}</div>
      {matches.length === 0 && <div className="empty-state"><Search size={28}/><h3>Não encontramos essa situação.</h3><p>Tente uma palavra mais simples ou peça orientação. Se houver risco de vida, ligue 192.</p><button className="button button-red" onClick={() => setIdentificationOpen(true)}>Não sei identificar</button></div>}
      <button className="help-row" onClick={() => setIdentificationOpen(true)}><span className="help-symbol">?</span><span><strong>Não sabe por onde começar?</strong><small>Algumas perguntas ajudam a encontrar o primeiro cuidado.</small></span><ArrowRight size={22}/></button>
    </section>
    <section className="page-width voice-section"><div className="voice-symbol" aria-hidden="true"><AudioLines/></div><div><p className="eyebrow">PULSO VOZ</p><h2>Ouça a orientação.<br/>Fique perto de quem precisa.</h2><p>Dentro de cada guia, toque em Ouvir. Para navegar por voz, toque no microfone e diga “próximo passo”, “repetir” ou “ajuda”.</p><small>O microfone só é ativado por você. O reconhecimento pode usar a internet e o serviço de voz do navegador.</small></div><Link to="/sobre#voz" className="text-link">Como funciona <ArrowUpRight size={18}/></Link></section>
    <section className="page-width editorial-note"><BookOpen size={20}/><p>Informação para apoiar o primeiro cuidado. Não substitui o atendimento de emergência ou treinamento prático. <Link to="/sobre">Conheça as fontes e os limites do Pulso.</Link></p></section>
  </div>
}
