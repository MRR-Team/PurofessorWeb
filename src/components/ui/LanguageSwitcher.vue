<template>
  <select v-model="language" class="p-2 border rounded">
    <option value="pl">🇵🇱 Polski</option>
    <option value="en">🇬🇧 English</option>
  </select>
</template>

<script setup lang="ts">
import { useLanguage } from '@/composables/useLanguage'

const { language } = useLanguage()
</script>
