<template>
  <button @click="toggleTheme" class="p-2 border rounded">
    {{ isDark ? '🌙' : '☀️' }}
  </button>
</template>

<script setup lang="ts">
import { useUiStore } from '@/stores/uiStore'
import { computed } from 'vue'

const store = useUiStore()
const isDark = computed(() => store.theme === 'dark')

function toggleTheme() {
  store.setTheme(isDark.value ? 'light' : 'dark')
}
</script>
