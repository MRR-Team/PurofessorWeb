<template>
  <div class="flex items-center justify-center min-h-screen px-4">
    <div class="card w-full max-w-md text-center">
      <h1 class="heading-1 mb-6">✅ Rejestracja zakończona</h1>

      <p class="text-body mb-4">
        Zweryfikuj proszę swój adres e-mail. Po potwierdzeniu będziesz mógł się zalogować.
      </p>

      <RouterLink
        to="/login"
        class="mt-4 inline-block px-6 py-2 bg-primary text-white rounded hover:bg-primary/90 transition"
      >
        Przejdź do logowania
      </RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>
