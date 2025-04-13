<!-- src/views/RegisterView.vue -->
<template>
  <div class="register-page">
    <h1>Rejestracja</h1>

    <form @submit.prevent="register">
      <label>
        Email:
        <input v-model="email" type="email" required />
      </label>

      <label>
        Hasło:
        <input v-model="password" type="password" required />
      </label>

      <label>
        Powtórz hasło:
        <input v-model="confirmPassword" type="password" required />
      </label>

      <p v-if="error" class="error">{{ error }}</p>

      <button type="submit">Zarejestruj się</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const error = ref('')

function register() {
  if (password.value !== confirmPassword.value) {
    error.value = 'Hasła się nie zgadzają'
    return
  }

  error.value = ''
  console.log('Register:', email.value, password.value)
  // TODO: tutaj będzie odwołanie do api marcel backend dzwoni
}
</script>

<style scoped>
.register-page {
  max-width: 400px;
  margin: 0 auto;
  padding: 2rem;
}
form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.error {
  color: red;
  font-weight: bold;
}
</style>
