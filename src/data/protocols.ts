import type { Protocol } from '../types/protocol.ts'
import { CRITICAL_PROTOCOLS } from './protocols-critical.ts'
import { STANDARD_PROTOCOLS } from './protocols-standard.ts'

export const PROTOCOLS: Record<string, Protocol> = {
  ...CRITICAL_PROTOCOLS,
  ...STANDARD_PROTOCOLS,
}

export const CARD_ORDER: string[] = [
  'pessoa-nao-responde',
  'sem-respirar',
  'engasgo',
  'sangramento',
  'queimadura',
  'convulsao',
  'desmaio',
  'choque-eletrico',
  'acidente',
  'queda-fratura',
  'emergencia-bebe',
  'emergencia-idoso',
  'socorros-animal',
  'parada-cardiaca',
  'reacao-alergica',
  'dor-no-peito',
  'incendio',
  'afogamento',
  'intoxicacao',
]
