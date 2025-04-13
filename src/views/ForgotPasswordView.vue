<template>
  <div class="forgot-password-page">
    <h1>Przypomnij hasło</h1>

    <form @submit.prevent="sendResetEmail">
      <label>
        Podaj swój adres e-mail:
        <input v-model="email" type="email" required />
      </label>

      <p v-if="error" class="error">{{ error }}</p>
      <p v-if="success" class="success">{{ success }}</p>

      <button type="submit">Wyślij link resetujący</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const email = ref('')
const error = ref('')
const success = ref('')

function sendResetEmail() {
  if (!email.value.includes('@')) {
    error.value = 'Wprowadź poprawny adres e-mail'
    success.value = ''
    return
  }

  error.value = ''
  success.value = ''

  console.log('Reset password for:', email.value)

  // TODO: Tutaj zapytanie do api musi być znowu api dzwoni marcel
  setTimeout(() => {
    success.value = 'Jeśli podany adres istnieje, wysłano wiadomość z instrukcjami.'
  }, 1000)
}
</script>

<style scoped>
.forgot-password-page {
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
.success {
  color: green;
  font-weight: bold;
}
</style>
