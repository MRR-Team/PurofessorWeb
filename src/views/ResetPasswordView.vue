<template>
  <div class="flex items-center justify-center min-h-screen px-4">
    <div class="card w-full max-w-md">
      <h1 class="heading-1 text-center mb-6">Resetowanie hasła</h1>

      <AuthForm
        :fields="['email']"
        submitText="Wyślij link resetujący"
        :loading="isLoading"
        @submit="onReset"
      />

      <p v-if="success" class="mt-4 text-sm text-green-600 text-center">
        Jeśli email istnieje, wysłano link do resetu hasła
      </p>

      <p v-if="error" class="mt-4 text-sm text-danger text-center">
        {{ error }}
      </p>

      <p class="mt-4 text-sm text-center">
        Pamiętasz hasło?
        <RouterLink to="/login" class="text-primary underline">Zaloguj się</RouterLink>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { handleReset } from '@/services/authViewService'
import AuthForm from '@/components/auth/AuthForm.vue'

const isLoading = ref(false)
const success = ref(false)
const error = ref<string | null>(null)

const onReset = async (form: Record<string, string>) => {
  success.value = false
  error.value = null
  isLoading.value = true

  try {
    await handleReset(form.email)
    success.value = true
  } catch (e: any) {
    if (e?.response?.status === 404) {
      error.value = 'Nie znaleziono konta z takim adresem email.'
    } else {
      error.value = 'Wystąpił błąd podczas resetowania hasła.'
    }
  } finally {
    isLoading.value = false
  }
}
</script>
