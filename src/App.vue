<template>
  <BackgroundWrapper>
    <div class="w-full max-w-7xl px-4 py-6 mx-auto">
      <header class="flex justify-between items-center border-b border-white/20 pb-4 mb-6">
        <nav class="space-x-6 text-white text-sm">
          <RouterLink to="/" class="hover:underline">Home</RouterLink>
          <RouterLink to="/about" class="hover:underline">About</RouterLink>
        </nav>
        <div class="flex items-center gap-4">
          <!-- Przykładowe komponenty: -->
          <!-- <ThemeSwitcher /> -->
          <!-- <LanguageSwitcher /> -->
        </div>
      </header>

      <main>
        <RouterView />
      </main>
    </div>
  </BackgroundWrapper>
</template>

<script setup lang="ts">
import { RouterView, RouterLink } from 'vue-router'
import BackgroundWrapper from '@/components/layout/BackgroundWrapper.vue'
import { useTheme } from '@/composables/useTheme'

useTheme()
</script>
