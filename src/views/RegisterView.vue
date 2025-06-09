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
const { t } = useTranslation()
const router = useRouter()
const { register } = useAuthUseCase()

const isLoading = ref(false)
const error = ref<string | null>(null)

const onRegister = async (form: Record<string, string>) => {
  isLoading.value = true
  error.value = null

  try {
    await register(form.name, form.email, form.password, form.confirmPassword)
    router.push('/login')
  } catch (e: any) {
    error.value = e.message || 'Błąd rejestracji'
  } finally {
    isLoading.value = false
  }
}
</script>
