<template>
  <div class="max-w-md mx-auto mt-10 p-4 border rounded">
    <h1 class="text-xl font-bold mb-4">Logowanie</h1>
    <form @submit.prevent="onLogin">
      <BaseInput v-model="email" type="email" placeholder="Email" class="mb-4" />
      <BaseInput v-model="password" type="password" placeholder="Hasło" class="mb-4" />
      <BaseButton type="submit">Zaloguj</BaseButton>
    </form>

    <p class="mt-4 text-sm text-center">
      Nie masz konta?
      <router-link to="/register" class="text-blue-600 underline">Zarejestruj się</router-link>
    </p>
    <p class="mt-2 text-sm text-center">
      Zapomniałeś hasła?
      <router-link to="/reset-password" class="text-blue-600 underline">Resetuj hasło</router-link>
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { handleLogin } from '@/services/authViewService'
import BaseInput from '@/components/shared/BaseInput.vue'
import BaseButton from '@/components/shared/BaseButton.vue'

const email = ref('')
const password = ref('')
const router = useRouter()

const onLogin = async () => {
  try {
    await handleLogin(email.value, password.value)
    router.push('/dashboard')
  } catch (err) {
    alert('Błąd logowania')
  }
}
</script>
