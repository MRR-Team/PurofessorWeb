<template>
  <div class="flex items-center justify-center min-h-screen px-4">
    <div class="card w-full max-w-md">
      <h1 class="heading-1 text-center mb-6">{{ t.loginTitle }}</h1>

      <AuthForm
        :fields="['email', 'password']"
        :submitText="t.loginSubmit"
        :loading="isLoading"
        @submit="onLogin"
      />

      <p v-if="error" class="mt-4 text-sm text-danger text-center">{{ t.loginError }}</p>

      <button
        @click="loginWithGoogle"
        class="mt-4 px-6 py-2 bg-red-600 text-white rounded transition w-full"
      >
        {{ t.loginGoogle }}
      </button>

      <p class="mt-4 text-sm text-center">
        {{ t.noAccount }}
        <RouterLink to="/register" class="text-primary underline">{{ t.registerNow }}</RouterLink>
      </p>

      <p class="text-sm text-center">
        {{ t.forgotPassword }}
        <RouterLink to="/reset-password" class="text-primary underline">{{ t.resetPasswordNow }}</RouterLink>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthUseCase } from '@/application/usecases/AuthUseCase'
import AuthForm from '@/components/auth/AuthForm.vue'
import { useTranslation } from '@/composables/useTranslation'
import { ValidatorUtils } from '@/utils/ValidatorUtils'
import { useUserSessionStore } from '@/stores/userSessionStore'
import { UserPersistenceAdapter } from '@/application/adapters/UserPersistenceAdapter'

const { t } = useTranslation()
const router = useRouter()
const sessionStore = useUserSessionStore()

const { login, loginWithGoogle, processGoogleCallback } = useAuthUseCase()

const isLoading = ref(false)
const error = ref<string | null>(null)

const onLogin = async (form: Record<string, string>) => {
  isLoading.value = true
  error.value = null

  const validationError = validateLoginForm(form)
  if (validationError) {
    error.value = validationError
    isLoading.value = false
    return
  }

  try {
    const { token, user } = await login(form.email, form.password)

    sessionStore.setUser(user)
    sessionStore.setToken(token)

    UserPersistenceAdapter.saveUser(user)
    UserPersistenceAdapter.saveToken(token)

    await router.push('/dashboard')
  } catch (e: any) {
    error.value = e.message || t.value.loginError
  } finally {
    isLoading.value = false
  }
}

function validateLoginForm(form: Record<string, string>): string | null {
  return (
    ValidatorUtils.validateEmail(form.email) ||
    ValidatorUtils.validatePassword(form.password) ||
    null
  )
}

onMounted(() => {
  const result = processGoogleCallback()
  if (result) {
    sessionStore.setUser(result.user)
    sessionStore.setToken(result.token)

    UserPersistenceAdapter.saveUser(result.user)
    UserPersistenceAdapter.saveToken(result.token)

    router.replace('/dashboard')
  }
})
</script>

