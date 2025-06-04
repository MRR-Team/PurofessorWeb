<template>
  <div class="flex items-center justify-center min-h-screen px-4">
    <div class="card w-full max-w-md">
      <h1 class="heading-1 text-center mb-6">Resetowanie hasła</h1>

      <form @submit.prevent="onReset" class="flex flex-col gap-4">
        <BaseInput v-model="email" type="email" placeholder="Email" />
        <BaseButton type="submit" :disabled="isLoading">
          {{ isLoading ? 'Wysyłanie...' : 'Wyślij link resetujący' }}
        </BaseButton>
      </form>

      <p v-if="success" class="mt-4 text-sm text-green-600 text-center">
        Jeśli email istnieje, wysłano link do resetu hasła ✅
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
import BaseInput from '@/components/shared/BaseInput.vue'
import BaseButton from '@/components/shared/BaseButton.vue'

const email = ref('')
const isLoading = ref(false)
const success = ref(false)
const error = ref<string | null>(null)

const onReset = async () => {
  success.value = false
  error.value = null
  isLoading.value = true

  try {
    await handleReset(email.value)
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
