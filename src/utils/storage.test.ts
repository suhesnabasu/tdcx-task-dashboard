import { describe, expect, it, beforeEach } from 'vitest'
import {
  readFromStorage,
  writeToStorage,
  clearStorageKey
} from './storage'

const KEY = 'test_key'

describe('storage helpers', () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  it('returns fallback when no data is stored', () => {
    const result = readFromStorage(KEY, ['fallback'])
    expect(result).toEqual(['fallback'])
  })

  it('persists values in localStorage', () => {
    writeToStorage(KEY, { name: 'Task' })
    const stored = readFromStorage<{ name: string } | null>(KEY, null)
    expect(stored).toEqual({ name: 'Task' })
    clearStorageKey(KEY)
    const afterClear = readFromStorage(KEY, 'none')
    expect(afterClear).toBe('none')
  })
})

