<template>
  <div class="flex items-center justify-center min-h-screen px-4">
    <div class="card w-full max-w-md">
      <h1 class="heading-1 text-center mb-6">Logowanie</h1>

      <AuthForm
        :fields="['email', 'password']"
        submitText="Zaloguj"
        :loading="isLoading"
        @submit="onLogin"
      />
      <p v-if="error" class="mt-4 text-sm text-danger text-center">{{ error }}</p>

      <button
        @click="loginWithGoogle"
        class="mt-4 px-6 py-2 bg-red-600 text-white rounded transition w-full"
      >
        Zaloguj przez Google
      </button>

      <p class="mt-4 text-sm text-center">
        Nie masz konta?
        <RouterLink to="/register" class="text-primary underline">Zarejestruj się</RouterLink>
      </p>
      <p class="text-sm text-center">
        Zapomniałeś hasła?
        <RouterLink to="/reset-password" class="text-primary underline">Resetuj hasło</RouterLink>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthUseCase } from '@/services/usecases/AuthUseCase'
import AuthForm from '@/components/auth/AuthForm.vue'

const router = useRouter()
const { login, loginWithGoogle, processGoogleCallback } = useAuthUseCase()

const isLoading = ref(false)
const error = ref<string | null>(null)

const onLogin = async (form: Record<string, string>) => {
  isLoading.value = true
  error.value = null

  try {
    await login(form.email, form.password)
    router.push('/dashboard')
  } catch (e: any) {
    error.value = e.message || 'Wystąpił błąd logowania.'
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  const result = processGoogleCallback()
  if (result) {
    router.replace('/dashboard')
  }
})
</script>
