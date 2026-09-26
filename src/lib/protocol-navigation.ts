import type { Protocol } from '../types/protocol.ts'
export function nextStepIndex(protocol: Protocol, currentIndex: number, targetId?: number) {
  const current = protocol.steps[currentIndex]
  if (!current) return currentIndex
  if (targetId !== undefined) {
    if (!current.choices?.some(choice => choice.nextStepId === targetId)) return currentIndex
    const index = protocol.steps.findIndex(step => step.id === targetId)
    return index < 0 ? currentIndex : index
  }
  if (current.choices || current.isFinal || currentIndex === protocol.steps.length - 1) return currentIndex
  return currentIndex + 1
}

export function guidanceSpeech(protocol: Protocol, index: number) {
  const step = protocol.steps[index]
  return [index === 0 ? protocol.initialAlert : '', step.title, step.mainInstruction, step.detailedText, step.warningNote ? `Atenção. ${step.warningNote}` : '', ...(step.choices || []).map((choice, i) => `Opção ${i + 1}: ${choice.text}.`)].filter(Boolean).join('. ')
}
