/**
 * Plugin list rules shared by the host catalog and tests.
 *
 * The browser bundle cannot import this file. client.js keeps a matching
 * originOf / sort. If these rules change, update both and the tests.
 *
 * Active time is the package directory mtime, not a call log. DSH does not
 * record when a plugin was invoked.
 */

export function originOf(moduleName) {
  const name = String(moduleName || '')
  if (name.startsWith('cordis:')) return 'system'
  if (name.startsWith('@deepseek-ai/')) return 'builtin'
  return 'installed'
}


