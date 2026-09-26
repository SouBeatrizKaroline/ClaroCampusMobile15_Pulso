import assert from 'node:assert/strict'
import test from 'node:test'
import { parseVoiceCommand } from '../src/lib/voice-commands.ts'
import { guidanceSpeech, nextStepIndex } from '../src/lib/protocol-navigation.ts'
import { PROTOCOLS, CARD_ORDER } from '../src/data/protocols.ts'

test('negation and conversational words cannot trigger a navigation command', () => {
  for (const phrase of ['não continuar', 'não próximo', 'não quero avançar', 'ele pediu ajuda ontem', 'sim', 'não', 'não está respirando']) assert.equal(parseVoiceCommand(phrase), 'unknown', phrase)
  assert.equal(parseVoiceCommand('Próximo passo!'), 'next')
  assert.equal(parseVoiceCommand('Não consegui.'), 'failed')
  assert.equal(parseVoiceCommand('Opção dois'), 'choice-2')
})
test('every branch has an existing target and every guide can reach a care endpoint', () => {
  for (const p of Object.values(PROTOCOLS)) {
    assert.equal(new Set(p.steps.map(s => s.id)).size, p.steps.length, p.id)
    for (const s of p.steps) {
      for (const c of s.choices || []) assert.ok(p.steps.some(next => next.id === c.nextStepId), `${p.id}: ${c.nextStepId}`)
      if (s.relatedProtocol) assert.ok(PROTOCOLS[s.relatedProtocol])
    }
    const visited = new Set<number>()
    const visit = (index: number) => {
      if (visited.has(index)) return
      visited.add(index)
      const s = p.steps[index]
      if (s.choices) s.choices.forEach(c => visit(p.steps.findIndex(next => next.id === c.nextStepId)))
      else if (!s.isFinal && index < p.steps.length - 1) visit(index + 1)
    }
    visit(0)
    assert.equal(visited.size, p.steps.length, `Unreachable step in ${p.id}`)
    assert.ok([...visited].some(i => p.steps[i].isFinal))
  }
})
test('generic next never skips a question or a terminal care instruction', () => {
  for (const p of Object.values(PROTOCOLS)) for (let index = 0; index < p.steps.length; index++) {
    if (p.steps[index].choices || p.steps[index].isFinal) assert.equal(nextStepIndex(p, index), index)
    assert.equal(nextStepIndex(p, index, 9999), index)
  }
})
test('respiratory decisions route to CPR only for the appropriate observed condition', () => {
  const p = PROTOCOLS['pessoa-nao-responde']
  const breathing = p.steps.findIndex(s => s.id === 3)
  assert.equal(p.steps[nextStepIndex(p, breathing, 4)].hasRhythmMetronome, true)
  assert.equal(p.steps[nextStepIndex(p, breathing, 5)].hasRhythmMetronome, undefined)
  assert.equal(nextStepIndex(p, breathing), breathing)
})
test('spoken guidance includes details, warnings and numbered choices', () => {
  for (const p of Object.values(PROTOCOLS)) p.steps.forEach((s, i) => {
    const text = guidanceSpeech(p, i)
    assert.ok(text.includes(s.mainInstruction)); assert.ok(text.includes(s.detailedText))
    if (s.warningNote) assert.ok(text.includes(s.warningNote))
    if (i === 0) assert.ok(text.includes(p.initialAlert))
    s.choices?.forEach((c, j) => assert.ok(text.includes(`Opção ${j + 1}: ${c.text}`)))
  })
})
test('every supported guide is discoverable on the home page', () => {
  assert.equal(new Set(CARD_ORDER).size, CARD_ORDER.length)
  assert.deepEqual([...CARD_ORDER].sort(), Object.keys(PROTOCOLS).sort())
})
