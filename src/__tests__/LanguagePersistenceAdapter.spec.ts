import { describe, it, expect, beforeEach } from 'vitest'
import { LanguagePersistenceAdapter } from '@/application/adapters/LanguagePersistenceAdapter'

describe('LanguagePersistenceAdapter', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('should save and get language', () => {
    LanguagePersistenceAdapter.saveLanguage('en')
    expect(LanguagePersistenceAdapter.getLanguage()).toBe('en')
  })

  it('should return "pl" if language is not set', () => {
    expect(LanguagePersistenceAdapter.getLanguage()).toBe('pl')
  })
})
