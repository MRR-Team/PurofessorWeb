<template>
  <div class="max-w-md mx-auto mt-10 p-4 border rounded">
    <h1 class="text-xl font-bold mb-4">Rejestracja</h1>
    <form @submit.prevent="handleRegister">
      <BaseInput v-model="name" type="text" placeholder="Imię" class="mb-4" />
      <BaseInput v-model="email" type="email" placeholder="Email" class="mb-4" />
      <BaseInput v-model="password" type="password" placeholder="Hasło" class="mb-4" />
      <BaseInput v-model="confirmPassword" type="password" placeholder="Potwierdź hasło" class="mb-4" />
      <BaseButton type="submit">Zarejestruj</BaseButton>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { register } from '@/services/authService'
import BaseInput from '@/components/shared/BaseInput.vue'
import BaseButton from '@/components/shared/BaseButton.vue'

const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')

const router = useRouter()

const handleRegister = async () => {
  if (password.value !== confirmPassword.value) {
    alert('Hasła się nie zgadzają')
    return
  }

  try {
    await register({
      name: name.value,
      email: email.value,
      password: password.value,
      password_confirmation: confirmPassword.value
    })
    alert('Rejestracja udana. Zaloguj się.')
    router.push('/login')
  } catch (err) {
    console.error('Rejestracja nieudana:', err)
    alert('Błąd rejestracji')
  }
}
</script>
