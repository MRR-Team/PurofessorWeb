<!-- src/views/LoginView.vue -->
<template>
  <div class="login-page">
    <h1>Zaloguj się</h1>

    <form @submit.prevent="login">
      <label>
        Email:
        <input v-model="email" type="email" required />
      </label>

      <label>
        Hasło:
        <input v-model="password" type="password" required />
      </label>

      <button type="submit">Zaloguj się</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const email = ref('')
const password = ref('')

function login() {
  console.log('Logowanie:', email.value, password.value)
}
</script>

<style scoped>
.login-page {
  max-width: 400px;
  margin: 0 auto;
  padding: 2rem;
}
form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
