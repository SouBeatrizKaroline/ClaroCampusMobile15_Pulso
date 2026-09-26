import { HeartPulse, Wind, Droplets, Flame, Brain, PersonStanding, Zap, CarFront, Bone, Baby, PawPrint, ShieldPlus, Waves, FlaskConical, Siren, HeartHandshake } from 'lucide-react'
const icons = { 'pessoa-nao-responde': PersonStanding, 'sem-respirar': Wind, engasgo: Wind, sangramento: Droplets, queimadura: Flame, convulsao: Brain, desmaio: PersonStanding, 'choque-eletrico': Zap, acidente: CarFront, 'queda-fratura': Bone, 'emergencia-bebe': Baby, 'emergencia-idoso': Brain, 'socorros-animal': PawPrint, 'parada-cardiaca': HeartPulse, 'reacao-alergica': ShieldPlus, afogamento: Waves, intoxicacao: FlaskConical, incendio: Siren, 'dor-no-peito': HeartHandshake }
export function ProtocolIcon({ id, className = '' }: { id: string; className?: string }) {
  const Icon = icons[id as keyof typeof icons] || ShieldPlus
  return <Icon className={className} strokeWidth={1.65} aria-hidden="true" />
}
