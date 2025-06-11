<template>
  <div class="flex items-center justify-center min-h-screen px-4">
    <div class="card w-full max-w-md">
      <h1 class="heading-1 text-center mb-6">{{ t.registerTitle }}</h1>

      <AuthForm
        :fields="['name', 'email', 'password', 'confirmPassword']"
        :submitText="t.registerSubmit"
        :loading="isLoading"
        @submit="onRegister"
      />

      <p v-if="error" class="mt-4 text-sm text-danger text-center">{{ t.registerError }}</p>

      <p class="mt-4 text-sm text-center">
        {{ t.alreadyHaveAccount }}
        <RouterLink to="/login" class="text-primary underline">{{ t.loginNow }}</RouterLink>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthUseCase } from '@/services/usecases/AuthUseCase'
import AuthForm from '@/components/auth/AuthForm.vue'
import { useTranslation } from '@/composables/useTranslation'
import { ValidatorUtils } from '@/utils/ValidatorUtils'

const { t } = useTranslation()
const router = useRouter()
const { register } = useAuthUseCase()
const isLoading = ref(false)
const error = ref<string | null>(null)
const onRegister = async (form: Record<string, string>) => {
  isLoading.value = true
  error.value = null

  const validationError = validateRegisterForm(form)
  if (validationError) {
    error.value = validationError
    isLoading.value = false
    return
  }

  try {
    await register(form.name, form.email, form.password, form.confirmPassword)
    await router.push('/register-success')
  } catch (e: any) {
    error.value = e.message || 'Błąd rejestracji'
  } finally {
    isLoading.value = false
  }
}
  function validateRegisterForm(form: Record<string, string>): string | null {
  return (
    ValidatorUtils.validateName(form.name) ||
    ValidatorUtils.validateEmail(form.email) ||
    ValidatorUtils.validatePassword(form.password) ||
    (form.password !== form.confirmPassword ? 'Hasła się nie zgadzają.' : null)
  )
}
</script>
