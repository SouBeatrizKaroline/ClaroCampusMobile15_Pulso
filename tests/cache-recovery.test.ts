import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import vm from 'node:vm'

test('recovery worker removes only the legacy Pulso cache, releases control and does not intercept requests', async () => {
  const handlers: Record<string, Function> = {}
  const deleted: string[] = []
  const actions: string[] = []
  vm.runInNewContext(readFileSync(new URL('../public/service-worker.js', import.meta.url), 'utf8'), {
    self: {
      addEventListener: (name: string, handler: Function) => { handlers[name] = handler },
      skipWaiting: () => actions.push('install'),
      clients: { claim: async () => actions.push('claim') },
      registration: { unregister: async () => actions.push('unregister') },
    },
    caches: { keys: async () => ['pulso-sos-v1', 'another-application'], delete: async (name: string) => deleted.push(name) },
  })
  handlers.install()
  let completed: Promise<unknown> = Promise.resolve()
  handlers.activate({ waitUntil: (promise: Promise<unknown>) => { completed = promise } })
  await completed
  assert.deepEqual(deleted, ['pulso-sos-v1'])
  assert.deepEqual(actions, ['install', 'claim', 'unregister'])
  assert.equal(handlers.fetch, undefined)
})
