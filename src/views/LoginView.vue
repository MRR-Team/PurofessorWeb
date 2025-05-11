<template>
  <div class="max-w-md mx-auto mt-10 p-4 border rounded">
    <h1 class="text-xl font-bold mb-4">Logowanie</h1>
    <form @submit.prevent="handleLogin">
      <BaseInput
        v-model="email"
        type="email"
        placeholder="Email"
        class="mb-4"
      />
      <BaseInput
        v-model="password"
        type="password"
        placeholder="Hasło"
        class="mb-4"
      />
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
import { login } from '@/services/authService'
import { useUserStore } from '@/stores/userStore'
import BaseInput from '@/components/shared/BaseInput.vue'
import BaseButton from '@/components/shared/BaseButton.vue'

const email = ref('')
const password = ref('')
const store = useUserStore()
const router = useRouter()

const handleLogin = async () => {
  try {
    const res = await login({ email: email.value, password: password.value })
    store.setUser(res.user, res.token)
    router.push('/dashboard') //
  } catch (err) {
    console.error('Błąd logowania:', err)
    alert('Nie udało się zalogować')
  }
}
</script>
