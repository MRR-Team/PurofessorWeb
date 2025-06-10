<template>
  <button @click="toggleTheme" class="input text-sm p-2 border rounded">
    {{ isDark ? '🌙' : '☀️' }}
  </button>
</template>

<script setup lang="ts">
import { useTheme } from '@/composables/useTheme'

const { isDark, toggleTheme } = useTheme()
</script>
