import {useTranslation} from "@/composables/useTranslation.ts";

const { t } = useTranslation()

export class ValidatorUtils {
  static validateName(name: string): string | null {
    if (!name.trim()) {
      return t.value.requiredName
    }
    return null
  }

  static validateEmail(email: string): string | null {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email.trim() || !emailPattern.test(email)) {
      return t.value.invalidEmail
    }
    return null
  }

  static validatePassword(password: string): string | null {
    if (!password || password.length < 6) {
      return t.value.passwordMustBe
    }
    return null
  }
}
