import { Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { EmergencyNumbersModal } from '@/components/EmergencyNumbersModal'
import { IdentificationModal } from '@/components/IdentificationModal'

export default function Layout() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (!pathname.startsWith('/emergencia/')) document.title = pathname === '/sobre' ? 'Sobre e fontes · Pulso' : 'Pulso · Primeiros socorros'
    if (hash) { const frame = requestAnimationFrame(() => document.getElementById(hash.slice(1))?.scrollIntoView()); return () => cancelAnimationFrame(frame) }
    window.scrollTo(0, 0)
  }, [pathname, hash])
  return (
    <div className="min-h-screen flex flex-col">
      <a href="#conteudo" className="skip-link">Ir para o conteúdo</a>
      <Header />
      <main id="conteudo" className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <EmergencyNumbersModal />
      <IdentificationModal />
    </div>
  )
}
