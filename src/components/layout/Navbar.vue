<template>
  <div class="navbar">
    <div class="navbar-left">
      <RouterLink to="/champions" class="navbar-link">Narzędzie counterpick</RouterLink>
      <RouterLink to="/server-status" class="navbar-link">Status Serwera LOL</RouterLink>
    </div>

    <div class="navbar-right">
      <span v-if="user" class="navbar-user">Witaj, {{ user.getDisplayName() }}</span>

      <button @click="toggleDropdown" class="navbar-button">
        ⚙
      </button>
      <div v-if="dropdownOpen" class="navbar-dropdown">
        <ThemeSwitcher />
        <LanguageSwitcher />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { useUserSessionStore } from '@/stores/userSessionStore'
import ThemeSwitcher from '@/components/ui/ThemeSwitcher.vue'
import LanguageSwitcher from '@/components/ui/LanguageSwitcher.vue'

const store = useUserSessionStore()
const user = store.user
const dropdownOpen = ref(false)

function toggleDropdown() {
  dropdownOpen.value = !dropdownOpen.value
}
</script>

<style scoped>
.navbar {
  @apply fixed top-0 left-0 z-50 w-full px-6 py-3 bg-primary text-white text-sm flex justify-between items-center;
}
.navbar-left {
  @apply flex gap-4;
}
.navbar-right {
  @apply flex items-center gap-4 relative;
}
.navbar-link {
  @apply hover:underline;
}
.navbar-user {
  @apply hidden sm:inline font-medium;
}
.navbar-button {
  @apply bg-white/10 px-2 py-1 rounded hover:bg-white/20 transition;
}
.navbar-dropdown {
  @apply absolute top-full right-0 mt-2 bg-bg-card text-body shadow-lg rounded-md p-4 flex flex-col gap-2 z-50;
  min-width: 160px;
}
</style>
