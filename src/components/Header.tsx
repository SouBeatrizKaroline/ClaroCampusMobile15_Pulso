import { Link } from 'react-router-dom'
import { Phone, ZoomIn } from 'lucide-react'
import { useApp } from '@/context/AppContext'
export function Header() {
  const { largeText, setLargeText } = useApp()
  return <>
    <div className="emergency-strip"><span>Emergência agora? Peça ajuda primeiro.</span><a href="tel:192">SAMU <b>192</b></a><span className="strip-divider"/><a href="tel:193">Bombeiros <b>193</b></a></div>
    <header className="site-header"><div className="page-width header-inner">
      <Link to="/" className="brand" aria-label="Pulso — início"><img src="/favicon.svg" alt="" width="42" height="42"/><span>pulso<span className="brand-dot">.</span><small>PRIMEIROS SOCORROS</small></span></Link>
      <nav aria-label="Navegação principal"><Link to="/#situacoes">Orientações</Link><Link to="/sobre">Sobre e fontes</Link></nav>
      <div className="header-actions"><button className="icon-button" onClick={() => setLargeText(!largeText)} aria-pressed={largeText} aria-label="Aumentar texto"><ZoomIn size={21}/></button><a className="button button-red small" href="tel:192"><Phone size={16}/><span>Ligar 192</span></a></div>
    </div></header>
  </>
}
