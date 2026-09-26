export const normalizeText = (text: string) => text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[.,!?;:]/g, '').trim()

// Only whole commands: “não continuar” must never advance an emergency guide.
export function parseVoiceCommand(text: string): string {
  const value = normalizeText(text)
  const commands: Record<string, string[]> = {
    next: ['proximo', 'proximo passo', 'avancar', 'continuar'],
    back: ['voltar', 'anterior', 'passo anterior'],
    repeat: ['repita', 'repetir', 'repita o passo', 'repetir orientacao'],
    stop: ['parar', 'silencio', 'parar leitura'],
    help: ['ajuda', 'socorro', 'preciso de ajuda', 'ligar 192', 'ligar samu', 'bombeiros'],
    failed: ['nao consegui', 'nao consigo'],
    'choice-1': ['opcao um', 'opcao 1', 'primeira opcao'],
    'choice-2': ['opcao dois', 'opcao 2', 'segunda opcao'],
    'choice-3': ['opcao tres', 'opcao 3', 'terceira opcao'],
    'choice-4': ['opcao quatro', 'opcao 4', 'quarta opcao'],
  }
  return Object.entries(commands).find(([, phrases]) => phrases.includes(value))?.[0] ?? 'unknown'
}
