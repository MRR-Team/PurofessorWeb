import { describe, it, expect } from 'vitest'
import { ValidatorUtils } from '@/utils/ValidatorUtils'

describe('ValidatorUtils', () => {
  describe('validateName', () => {
    it('should return error if name is empty', () => {
      expect(ValidatorUtils.validateName('')).toBe('Imię jest wymagane.')
    })

    it('should return null if name is valid', () => {
      expect(ValidatorUtils.validateName('Darkness')).toBeNull()
    })
  })

  describe('validateEmail', () => {
    it('should return error if email is invalid', () => {
      expect(ValidatorUtils.validateEmail('invalid')).toBe('Podaj poprawny adres e-mail.')
    })

    it('should return null if email is valid', () => {
      expect(ValidatorUtils.validateEmail('test@example.com')).toBeNull()
    })
  })

  describe('validatePassword', () => {
    it('should return error if password is too short', () => {
      expect(ValidatorUtils.validatePassword('123')).toBe('Hasło musi mieć co najmniej 6 znaków.')
    })

    it('should return null if password is valid', () => {
      expect(ValidatorUtils.validatePassword('123456')).toBeNull()
    })
  })
})
