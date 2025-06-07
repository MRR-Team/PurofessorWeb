<template>
  <div class="navbar-right relative">
    <template v-if="store.user">
      <span class="navbar-user">Witaj, {{ store.user.getDisplayName() }}</span>
      <button @click="toggleSettings" class="navbar-button">⚙</button>
      <button @click="toggleProfile" class="navbar-button">👤</button>
      <button @click="logout" class="text-sm underline hover:no-underline">Wyloguj</button>
    </template>

    <template v-else>
      <RouterLink to="/login" class="text-sm underline hover:no-underline">Zaloguj</RouterLink>
    </template>

    <NavbarDropdown v-if="settingsOpen" />
    <NavbarUserDropdown v-if="profileOpen && store.user" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import { useUserSessionStore } from '@/stores/userSessionStore'
import NavbarDropdown from './NavbarDropdown.vue'
import NavbarUserDropdown from './NavbarUserDropdown.vue'

const store = useUserSessionStore()
const router = useRouter()

const settingsOpen = ref(false)
const profileOpen = ref(false)

function toggleSettings() {
  settingsOpen.value = !settingsOpen.value
  profileOpen.value = false
}

function toggleProfile() {
  profileOpen.value = !profileOpen.value
  settingsOpen.value = false
}

function logout() {
  store.clearSession()
  router.push('/login')
}
</script>

<style scoped>
.navbar-right {
  @apply flex items-center gap-4 relative;
}
.navbar-user {
  @apply hidden sm:inline font-medium;
}
.navbar-button {
  @apply bg-white/10 px-2 py-1 rounded hover:bg-white/20 transition;
}
</style>
