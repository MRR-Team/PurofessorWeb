<template>
  <div class="max-w-md mx-auto mt-10 p-4 border rounded">
    <h1 class="text-xl font-bold mb-4">Resetowanie hasła</h1>
    <form @submit.prevent="onReset">
      <BaseInput v-model="email" type="email" placeholder="Email" class="mb-4" />
      <BaseButton type="submit">Wyślij link resetujący</BaseButton>
    </form>

    <p class="mt-4 text-sm text-center">
      Pamiętasz hasło?
      <router-link to="/login" class="text-blue-600 underline">Zaloguj się</router-link>
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { handleReset } from '@/services/authViewService'
import BaseInput from '@/components/shared/BaseInput.vue'
import BaseButton from '@/components/shared/BaseButton.vue'

const email = ref('')
const router = useRouter()

const onReset = async () => {
  try {
    await handleReset(email.value)
    alert('Jeśli email istnieje, wysłano link do resetu hasła.')
    router.push('/login')
  } catch (err) {
    alert('Błąd resetowania hasła.')
  }
}
</script>
