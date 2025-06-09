<template>
  <div class="navbar-left">
    <RouterLink to="/counterpick" class="navbar-link">{{ t.counterPickTitle }}</RouterLink>
    <RouterLink to="/items" class="navbar-link">{{ t.buildTitle }}</RouterLink>
    <RouterLink to="/server-status" class="navbar-link">{{t.serverStatusTitle }}</RouterLink>
    <RouterLink to="/rotation" class="navbar-link">{{ t.menuRotation }}</RouterLink>

  </div>
</template>


<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useTranslation } from '@/composables/useTranslation'
const { t } = useTranslation()
</script>

<style scoped>
.navbar-left {
  @apply flex gap-4;
}
.navbar-link {
  @apply hover:underline;
}
</style>
