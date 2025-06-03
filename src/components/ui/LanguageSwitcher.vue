<template>
  <select v-model="locale" @change="onChange" class="p-2 border rounded">
    <option value="pl">🇵🇱 Polski</option>
    <option value="en">🇬🇧 English</option>
  </select>
</template>

<script setup lang="ts">
import { useUiStore } from '@/stores/uiStore'
import { computed } from 'vue'

const store = useUiStore()
const locale = computed({
  get: () => store.language,
  set: value => store.setLanguage(value)
})

function onChange() {
}
</script>
