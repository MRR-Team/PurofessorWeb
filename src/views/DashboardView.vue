<template>
  <div class="max-w-2xl mx-auto mt-10 p-6 border rounded shadow bg-white">
    <h1 class="text-2xl font-bold mb-4">Witaj w panelu użytkownika</h1>
    <p class="text-gray-700">Jesteś zalogowany jako:
      <strong>{{ user?.name }}</strong> ({{ user?.email }})
    </p>
    <p class="text-sm text-gray-500 mt-2">Twoja rola: <code>{{ user?.role }}</code></p>
  </div>
</template>

<script setup lang="ts">
import { useUserSessionStore } from '@/stores/userSessionStore';

const { user } = useUserSessionStore();
</script>
