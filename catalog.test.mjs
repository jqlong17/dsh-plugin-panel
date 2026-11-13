import test from 'node:test'
import assert from 'node:assert/strict'
import { originOf } from './catalog.js'

test('origin splits built-in, installed, and structural rows', () => {
  assert.equal(originOf('@deepseek-ai/dsh-agent'), 'builtin')
  assert.equal(originOf('dsh-promo'), 'installed')
  assert.equal(originOf('file:///tmp/dsh-promo/lib/index.js'), 'installed')
  assert.equal(originOf('cordis:include'), 'system')
  assert.equal(originOf(''), 'installed')
})


