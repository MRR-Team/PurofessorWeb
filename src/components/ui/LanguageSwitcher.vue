<template>
  <select v-model="language" class="input text-sm">
    <option value="pl">🇵🇱 Polski</option>
    <option value="en">🇬🇧 English</option>
  </select>
</template>z

<script setup lang="ts">
import { useLanguage } from '@/composables/useLanguage'

const { language } = useLanguage()
</script>
