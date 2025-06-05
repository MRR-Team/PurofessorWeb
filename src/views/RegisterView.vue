<template>
  <div class="flex items-center justify-center min-h-screen px-4">
    <div class="card w-full max-w-md">
      <h1 class="heading-1 text-center mb-6">Rejestracja</h1>

      <AuthForm
        :fields="['name', 'email', 'password', 'confirmPassword']"
        submitText="Zarejestruj"
        :loading="isLoading"
        @submit="onRegister"
      />

      <p v-if="error" class="mt-4 text-sm text-danger text-center">{{ error }}</p>

      <p class="mt-4 text-sm text-center">
        Masz już konto?
        <RouterLink to="/login" class="text-primary underline">Zaloguj się</RouterLink>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { handleRegister } from '@/services/authViewService'
import axios from 'axios'
import AuthForm from '@/components/auth/AuthForm.vue'

const error = ref<string | null>(null)
const isLoading = ref(false)
const router = useRouter()

const onRegister = async (form: Record<string, string>) => {
  error.value = null
  isLoading.value = true

  try {
    await handleRegister(
      form.name,
      form.email,
      form.password,
      form.confirmPassword
    )
    router.push('/login')
  } catch (e: any) {
    if (e.message === 'Hasła się nie zgadzają') {
      error.value = 'Hasła się nie zgadzają'
    } else if (e?.response?.status === 422) {
      error.value = 'Podany email już istnieje lub dane są niepoprawne'
    } else {
      error.value = 'Błąd rejestracji'
    }
  } finally {
    isLoading.value = false
  }
}
</script>
