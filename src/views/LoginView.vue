<template>
  <div class="flex items-center justify-center min-h-screen px-4">
    <div class="card w-full max-w-md">
      <h1 class="heading-1 text-center mb-6">Logowanie</h1>

      <form @submit.prevent="onLogin" class="flex flex-col gap-4">
        <BaseInput v-model="email" type="email" placeholder="Email" />
        <BaseInput v-model="password" type="password" placeholder="Hasło" />
        <BaseButton type="submit" :disabled="isLoading">
          {{ isLoading ? 'Logowanie...' : 'Zaloguj' }}
        </BaseButton>
      </form>

      <p v-if="error" class="mt-4 text-sm text-danger text-center">{{ error }}</p>

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
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserSessionStore } from '@/stores/userSessionStore'
import { handleLogin } from '@/services/authViewService'
import BaseInput from '@/components/shared/BaseInput.vue'
import BaseButton from '@/components/shared/BaseButton.vue'
import axios from 'axios'

const email = ref('')
const password = ref('')
const error = ref<string | null>(null)

const router = useRouter()
const store = useUserSessionStore()
const isLoading = store.isLoading

const onLogin = async () => {
  error.value = null
  try {
    await handleLogin(email.value, password.value)
    if (!store.error) {
      router.push('/dashboard')
    } else {
      error.value = store.error
    }
  } catch (e: unknown) {
    if (axios.isAxiosError(e)) {
      switch (e.response?.status) {
        case 401:
          error.value = 'Nieprawidłowy email lub hasło.'
          break
        case 500:
          error.value = 'Błąd serwera. Spróbuj ponownie później.'
          break
        default:
          error.value = e.response?.data?.message || 'Wystąpił błąd logowania.'
      }
    } else if (e instanceof Error) {
      error.value = e.message
    } else {
      error.value = 'Wystąpił nieznany błąd.'
    }
  }
}
</script>
