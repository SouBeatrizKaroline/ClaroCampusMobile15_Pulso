import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { useApp } from '@/context/AppContext'
export function IdentificationModal() {
  const { identificationOpen, setIdentificationOpen } = useApp()
  const [question, setQuestion] = useState(0)
  const navigate = useNavigate()
  const close = () => { setIdentificationOpen(false); setQuestion(0) }
  const open = (id: string) => { close(); navigate(`/emergencia/${id}`) }
  return <Dialog open={identificationOpen} onOpenChange={open => { if (!open) close() }}><DialogContent className="identification-dialog"><DialogHeader><DialogTitle>Vamos encontrar o primeiro cuidado.</DialogTitle><DialogDescription>Estas perguntas não fazem diagnóstico. Se houver perigo ou dúvida, ligue 192 agora.</DialogDescription></DialogHeader><a className="button button-red" href="tel:192">Ligar para o SAMU · 192</a>
    <h3>{question === 0 ? 'É um bebê ou uma criança sem sinais de puberdade?' : question === 1 ? 'A pessoa responde quando você chama?' : 'Qual sinal você observa?'}</h3>
    {question === 0 ? <div className="dialog-choices"><button onClick={() => open('emergencia-bebe')}>Sim, bebê ou criança</button><button onClick={() => setQuestion(1)}>Não, adolescente ou adulto</button></div> : question === 1 ? <div className="dialog-choices"><button onClick={() => open('pessoa-nao-responde')}>Não responde ou tenho dúvida</button><button onClick={() => setQuestion(2)}>Sim, está respondendo</button></div> : <div className="dialog-choices"><button onClick={() => open('engasgo')}>Engasgo: não consegue falar ou tossir</button><button onClick={() => open('sangramento')}>Sangramento intenso</button><button onClick={() => open('dor-no-peito')}>Dor no peito ou falta de ar súbita</button><button onClick={() => open('emergencia-idoso')}>Fala diferente, boca torta ou braço fraco</button><button onClick={() => { close(); document.getElementById('situacoes')?.scrollIntoView(); navigate('/#situacoes') }}>Nenhuma dessas: ver todas as situações</button></div>}
    {question > 0 && <button className="text-link" onClick={() => setQuestion(question - 1)}>Voltar à pergunta anterior</button>}
  </DialogContent></Dialog>
}
