<template>
  <div class="navbar-left">
    <RouterLink to="/champions" class="navbar-link">Narzędzie counterpick</RouterLink>
    <RouterLink to="/items" class="navbar-link">Generuj przedmioty</RouterLink>
    <RouterLink to="/server-status" class="navbar-link">Status Serwera LOL</RouterLink>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<style scoped>
.navbar-left {
  @apply flex gap-4;
}
.navbar-link {
  @apply hover:underline;
}
</style>
