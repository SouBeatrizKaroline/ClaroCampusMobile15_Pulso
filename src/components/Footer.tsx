import { Link } from 'react-router-dom'
export function Footer() {
  return <footer className="site-footer"><div className="page-width footer-inner"><div><Link to="/" className="footer-brand">pulso.</Link><p>O cuidado começa no primeiro gesto.</p></div><div><strong>Ajuda de verdade, do outro lado da linha.</strong><div className="footer-phones"><a href="tel:192">SAMU <b>192</b></a><a href="tel:193">Bombeiros <b>193</b></a></div></div></div><div className="page-width footer-bottom"><span>© {new Date().getFullYear()} Pulso · Primeiros socorros</span><Link to="/sobre">Fontes, privacidade e acessibilidade</Link><span>Feito para ajudar.</span></div></footer>
}
