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
        class="mt-4 px-6 py-2 bg-red-600 text-white rounded  transition w-full"
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
import { useUserSessionStore } from '@/stores/userSessionStore'
import { handleLogin } from '@/services/authViewService'
import { GoogleAuthService } from '@/services/GoogleAuthService'
import { UserPersistenceService } from '@/services/userPersistenceService'
import axios from 'axios'
import AuthForm from '@/components/auth/AuthForm.vue'

const error = ref<string | null>(null)
const router = useRouter()
const store = useUserSessionStore()
const isLoading = store.isLoading

const onLogin = async (form: Record<string, string>) => {
  error.value = null
  try {
    await handleLogin(form.email, form.password)
    if (!store.error) {
      await router.push('/dashboard')
    } else {
      error.value = store.error
    }
  } catch (e: unknown) {
    if (axios.isAxiosError(e)) {
      switch (e.response?.status) {
        case 401:
          error.value = 'Nieprawidłowy email lub hasło.'
          break
        default:
          error.value = e.response?.data?.message || 'Wystąpił błąd logowania.'
      }
    } else {
      error.value = 'Wystąpił nieznany błąd.'
    }
  }
}

const loginWithGoogle = () => {
  GoogleAuthService.loginWithGoogle()
}

onMounted(() => {
  const result = GoogleAuthService.processGoogleCallback()
  if (result) {
    store.setUser(result.user)
    store.setToken(result.token)

    UserPersistenceService.saveUser(result.user)
    UserPersistenceService.saveToken(result.token)

    router.replace('/dashboard')
  }
})
</script>
