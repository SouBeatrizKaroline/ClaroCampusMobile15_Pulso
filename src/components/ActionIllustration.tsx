import { useEffect, useState } from 'react'
import { Pause, Play } from 'lucide-react'

type Action = 'cpr' | 'choking' | 'baby' | 'cool' | 'pressure' | 'recovery' | 'safety' | 'seizure'
const illustrations: Record<string, Action> = {
  'pessoa-nao-responde:4': 'cpr', 'sem-respirar:4': 'cpr', 'parada-cardiaca:4': 'cpr',
  'engasgo:3': 'choking', 'emergencia-bebe:4': 'baby', 'emergencia-bebe:5': 'choking',
  'queimadura:1': 'cool', 'sangramento:1': 'pressure', 'sangramento:2': 'pressure',
  'pessoa-nao-responde:5': 'recovery', 'sem-respirar:5': 'recovery', 'parada-cardiaca:5': 'recovery',
  'convulsao:1': 'seizure', 'choque-eletrico:1': 'safety', 'incendio:1': 'safety', 'acidente:1': 'safety',
}
const labels: Record<Action, { title: string; caption: string }> = {
  cpr: { title: 'Compressões no peito · adulto', caption: 'Uma mão sobre a outra no centro do peito. Braços esticados. Pressione e deixe o peito voltar. O desenho é lento para mostrar o movimento; na RCP, mantenha 100 a 120 compressões por minuto.' },
  choking: { title: 'Engasgo grave · pessoa consciente', caption: 'Alterne 5 golpes na parte alta das costas e 5 compressões para dentro e para cima, acima do umbigo. Na gestação avançada ou quando não conseguir envolver o abdome, use compressões no tórax. Pare se o objeto sair; se perder a resposta, inicie RCP.' },
  baby: { title: 'Engasgo grave · bebê consciente menor de 1 ano', caption: 'Mantenha cabeça e pescoço apoiados, com a cabeça abaixo do tronco. Alterne 5 golpes nas costas e 5 impulsos no osso do peito com a base de uma mão. Nunca comprima o abdome. Pare se desobstruir; se perder a resposta, inicie RCP infantil.' },
  cool: { title: 'Resfriamento de queimadura térmica', caption: 'Água corrente fresca sobre a área queimada. Mantenha o restante do corpo aquecido. Não coloque gelo ou receitas caseiras.' },
  pressure: { title: 'Pressão direta no ferimento', caption: 'Coloque gaze ou pano limpo sobre a ferida e pressione de forma firme e contínua. Não fique levantando para olhar. Se houver objeto cravado, pressione ao redor dele.' },
  recovery: { title: 'De lado, somente se respira normalmente', caption: 'Sem suspeita de trauma, coloque de lado com a boca voltada para baixo e a passagem de ar livre. Acompanhe a respiração. Se não respirar normalmente, precisa de RCP.' },
  safety: { title: 'Sua segurança vem primeiro', caption: 'Mantenha distância do perigo. Impeça que outras pessoas se aproximem e peça ajuda. Não toque em fios, não entre em área com fogo e não se exponha ao trânsito.' },
  seizure: { title: 'Proteja sem conter os movimentos', caption: 'Afaste objetos e apoie a cabeça em algo macio. Não segure braços ou pernas. Não coloque nada na boca. Marque o tempo da crise.' },
}
function Arrow({ x, y, direction = 'down' }: { x: number; y: number; direction?: 'down' | 'up' }) {
  return <g transform={`translate(${x} ${y}) ${direction === 'up' ? 'rotate(180)' : ''}`} fill="none" stroke="#b83238" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><path d="M0 -20V10M-8 2L0 10L8 2"/></g>
}
function AdultTorso({ x = 0, y = 0 }: { x?: number; y?: number }) {
  return <g transform={`translate(${x} ${y})`} stroke="#526a59" strokeWidth="2.5"><circle cx="80" cy="36" r="21" fill="#d8bca4"/><path d="M63 58Q37 60 33 88L25 148M96 58Q120 60 125 88L132 148" fill="none" strokeWidth="13" strokeLinecap="round"/><path d="M56 59Q80 70 104 59L110 147H50Z" fill="#d8e2d1"/><path d="M59 150L53 192M101 150L106 192" fill="none" strokeWidth="17" strokeLinecap="round"/></g>
}
function Scene({ action }: { action: Action }) {
  if (action === 'cpr') return <>
    <AdultTorso x={16}/><path d="M96 81v45" stroke="#8ca184" strokeWidth="2" strokeDasharray="4 4"/><circle cx="96" cy="109" r="12" fill="#ba444126" stroke="#b83238" strokeWidth="2"/>
    <path d="M112 109H160" stroke="#b83238" strokeWidth="1.5"/><text x="17" y="214">CENTRO DO PEITO</text>
    <path d="M227 172H455" stroke="#aab7a1" strokeWidth="3"/><circle cx="242" cy="145" r="22" fill="#d8bca4" stroke="#526a59" strokeWidth="2"/><path d="M266 162Q273 122 314 129L365 150L438 156L442 169H266Z" fill="#d8e2d1" stroke="#526a59" strokeWidth="2.5"/>
    <g className="move-compress"><path d="M296 30V116M317 30V116" stroke="#a78065" strokeWidth="13" strokeLinecap="round"/><rect x="285" y="113" width="42" height="12" rx="6" fill="#d8bca4" stroke="#526a59" strokeWidth="2"/><rect x="290" y="105" width="38" height="12" rx="6" fill="#e7cdb5" stroke="#526a59" strokeWidth="2"/><Arrow x={351} y={89}/></g><text x="263" y="210">PRESSIONE E SOLTE O PESO</text>
  </>
  if (action === 'choking') return <>
    <g transform="translate(12 0)"><circle cx="140" cy="76" r="21" fill="#d8bca4" stroke="#526a59" strokeWidth="2"/><path d="M70 135L115 83L139 107L100 148Z" fill="#d8e2d1" stroke="#526a59" strokeWidth="2.5"/><path d="M82 141L62 189M99 147L107 192M125 109L139 145" stroke="#526a59" strokeWidth="13" strokeLinecap="round"/><g className="move-back-blow"><path d="M47 45L78 69L94 87" fill="none" stroke="#a78065" strokeWidth="13" strokeLinecap="round"/><Arrow x={89} y={45}/></g><circle cx="92" cy="92" r="10" fill="#b8323825" stroke="#b83238" strokeDasharray="3 3"/></g>
    <path d="M227 33V185" stroke="#d6dfd0"/>
    <AdultTorso x={271}/><circle cx="351" cy="130" r="3" fill="#526a59"/>
    <g className="move-in-up"><path d="M292 100Q297 120 338 116M410 100Q405 126 358 116" fill="none" stroke="#a78065" strokeWidth="12" strokeLinecap="round"/><rect x="336" y="108" width="26" height="15" rx="7" fill="#d8bca4" stroke="#526a59" strokeWidth="2"/><Arrow x={393} y={119} direction="up"/></g>
    <text x="26" y="216">5 GOLPES NAS COSTAS</text><text x="267" y="216">5 COMPRESSÕES ABDOMINAIS</text>
  </>
  if (action === 'baby') return <>
    <path d="M231 24V182" stroke="#d6dfd0"/>
    {[0, 238].map((x, i) => <g key={i} transform={`translate(${x} 0)`}>
      <path d="M28 165L177 110L207 129" stroke="#a78065" strokeWidth="20" strokeLinecap="round" fill="none"/>
      <g transform="rotate(-18 110 115)"><circle cx="53" cy="112" r="22" fill="#e7cdb5" stroke="#526a59" strokeWidth="2"/><rect x="77" y="91" width="74" height="42" rx="19" fill={i ? '#f1dfcc' : '#d8e2d1'} stroke="#526a59" strokeWidth="2"/><path d="M146 99L174 92M146 127L174 133" stroke="#d8bca4" strokeWidth="12" strokeLinecap="round"/><path d="M38 130L67 136" stroke="#a78065" strokeWidth="9" strokeLinecap="round"/><circle cx="100" cy="107" r="9" stroke="#b83238" strokeWidth="2" fill="#b8323825"/></g>
      <g className="move-baby-hand"><path d="M109 36V75" stroke="#a78065" strokeWidth="12" strokeLinecap="round"/><path d="M100 77H120" stroke="#d8bca4" strokeWidth="13" strokeLinecap="round"/><Arrow x={148} y={54}/></g>
    </g>)}<text x="24" y="207">5 GOLPES · DE BRUÇOS</text><text x="263" y="207">5 IMPULSOS · DE COSTAS</text><text x="116" y="231">CABEÇA SEMPRE APOIADA E MAIS BAIXA</text>
  </>
  if (action === 'cool') return <>
    <path d="M111 39H185V65H221V83H170V62H111" fill="#b9cac0" stroke="#526a59" strokeWidth="3"/><path d="M176 27V42M161 26H191" stroke="#526a59" strokeWidth="7" strokeLinecap="round"/>
    <path d="M126 174L336 132Q365 128 380 147L338 161L131 202Z" fill="#e7cdb5" stroke="#526a59" strokeWidth="3"/><ellipse cx="215" cy="171" rx="33" ry="12" fill="#d89580"/>
    <g stroke="#5492a2" strokeWidth="4" strokeLinecap="round" className="flow-water"><path d="M180 94v45M192 92v65M204 94v51M216 93v35"/></g><path d="M104 211H396" stroke="#adcbc9" strokeWidth="3"/><text x="263" y="73">ÁGUA CORRENTE</text><text x="263" y="95">FRESCA, SEM GELO</text>
  </>
  if (action === 'pressure') return <>
    <path d="M48 153L366 129Q403 135 429 159L395 179L56 201Z" fill="#e7cdb5" stroke="#526a59" strokeWidth="3"/><path d="M171 134L274 130L282 179L173 184Z" fill="#fff" stroke="#a2b099" strokeWidth="2"/><path d="M189 151L266 147M191 165L268 161" stroke="#dce3d6" strokeWidth="2"/>
    <path d="M203 30V125M231 30V125" stroke="#a78065" strokeWidth="16" strokeLinecap="round"/><rect x="189" y="120" width="54" height="19" rx="9" fill="#e7cdb5" stroke="#526a59" strokeWidth="2"/><g className="pressure-arrow"><Arrow x={299} y={88}/></g><text x="93" y="225">PRESSIONE SEM LEVANTAR O PANO</text>
  </>
  if (action === 'recovery' || action === 'seizure') return <>
    <path d="M33 183H446" stroke="#b9c6b0" strokeWidth="3"/>
    {action === 'seizure' && <rect x="53" y="159" width="87" height="23" rx="11" fill="#c4d5bd"/>}
    <circle cx="100" cy="141" r="29" fill="#e7cdb5" stroke="#526a59" strokeWidth="2.5"/><path d="M94 144L85 151L97 154" fill="none" stroke="#526a59" strokeWidth="2"/><path d="M132 124Q191 105 263 137L258 174L130 174Z" fill="#d8e2d1" stroke="#526a59" strokeWidth="3"/>
    <path d={action === 'recovery' ? 'M245 146L304 125L357 174M252 166L410 174M149 133L173 161L117 167' : 'M250 147L407 171M248 165L397 174M150 145L187 169L225 174'} stroke="#a78065" strokeWidth="13" strokeLinecap="round" fill="none"/>
    {action === 'recovery' ? <><path className="breath-line" d="M79 158Q61 163 58 174M79 149Q49 148 41 159" fill="none" stroke="#65958d" strokeWidth="3"/><text x="109" y="219">OBSERVE A RESPIRAÇÃO CONTINUAMENTE</text></> : <><circle cx="391" cy="63" r="28" stroke="#6c8463" fill="#f5f6ef" strokeWidth="3"/><path d="M391 44V63L403 70" fill="none" stroke="#6c8463" strokeWidth="3"/><text x="44" y="70">APOIO MACIO SOB A CABEÇA</text><text x="120" y="219">NÃO CONTENHA OS MOVIMENTOS</text></>}
  </>
  return <><path d="M245 36L319 166H171Z" fill="#f7e7c9" stroke="#b18a45" strokeWidth="3"/><path d="M245 75v43" stroke="#967138" strokeWidth="8" strokeLinecap="round"/><circle cx="245" cy="140" r="4" fill="#967138"/><path d="M73 187H415" stroke="#b83238" strokeWidth="4" strokeDasharray="12 8"/><g className="safety-arrow"><path d="M90 113H145M90 113L104 99M90 113L104 127" fill="none" stroke="#526a59" strokeWidth="4"/></g><text x="114" y="222">MANTENHA DISTÂNCIA · PEÇA AJUDA</text></>
}

export function ActionIllustration({ protocolId, stepId }: { protocolId: string; stepId: number }) {
  const action = illustrations[`${protocolId}:${stepId}`]
  const [paused, setPaused] = useState(() => typeof window.matchMedia === 'function' && window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  useEffect(() => {
    if (!window.matchMedia) return
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => { if (media.matches) setPaused(true) }
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])
  if (!action) return null
  const label = labels[action]
  return <figure className={`action-illustration ${paused ? 'animation-paused' : ''}`}><div className="illustration-header"><strong>{label.title}</strong><button onClick={() => setPaused(!paused)} aria-pressed={paused} aria-label={paused ? 'Reproduzir representação' : 'Pausar representação'}>{paused ? <Play size={15}/> : <Pause size={15}/>} {paused ? 'Reproduzir' : 'Pausar'}</button></div><svg viewBox="0 0 480 245" role="img" aria-label={label.caption}><Scene action={action}/></svg><figcaption>{label.caption}<small>Representação esquemática. Siga as instruções da etapa e da central de emergência.</small></figcaption></figure>
}
