export class ValidatorUtils {
  static validateName(name: string): string | null {
    if (!name.trim()) {
      return 'Imię jest wymagane.'
    }
    return null
  }

  static validateEmail(email: string): string | null {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email.trim() || !emailPattern.test(email)) {
      return 'Podaj poprawny adres e-mail.'
    }
    return null
  }

  static validatePassword(password: string): string | null {
    if (!password || password.length < 6) {
      return 'Hasło musi mieć co najmniej 6 znaków.'
    }
    return null
  }
}
