<template>
  <div class="min-h-screen  text-black  dark:text-white p-6">
    <div class="flex justify-end gap-4 mb-6">
      <ThemeSwitcher />
      <LanguageSwitcher />
    </div>
    <div class="max-w-2xl mx-auto mt-10 p-6 border rounded shadow bg-white dark:bg-gray-800">
    <h1 class="text-2xl font-bold mb-4">Witaj w panelu użytkownika</h1>
    <p class="text-gray-700">Jesteś zalogowany jako:
      <strong>{{ user?.name }}</strong> ({{ user?.email }})
    </p>
      <p class="text-sm text-gray-500 dark:text-gray-400 mt-2">
        Twoja rola: <code>{{ user?.role }}</code>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserSessionStore } from '@/stores/userSessionStore';
import ThemeSwitcher from '@/components/ui/ThemeSwitcher.vue'
import LanguageSwitcher from '@/components/ui/LanguageSwitcher.vue'

const { user } = useUserSessionStore();
</script>
