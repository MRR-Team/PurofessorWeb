<template>
  <div class="navbar-right relative">
    <template v-if="currentUser">
      <span class="navbar-user">{{ t.loggedInAs }} {{ currentUser?.name }}</span>
      <button @click="toggleProfile" class="navbar-button">👤</button>
    </template>
    <button @click="toggleSettings" class="navbar-button">⚙</button>
    <template v-if="currentUser">
      <button @click="logout" class="text-sm underline hover:no-underline">{{ t.logout }}</button>
    </template>
    <template v-else>
      <RouterLink to="/login" class="text-sm underline hover:no-underline">{{ t.loginTitle }}</RouterLink>
    </template>

    <NavbarDropdown v-if="settingsOpen" />
    <NavbarUserDropdown v-if="profileOpen && currentUser" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import { useUserSessionStore } from '@/stores/userSessionStore'
import { useUserStore } from '@/stores/userStore'
import NavbarDropdown from './NavbarDropdown.vue'
import NavbarUserDropdown from './NavbarUserDropdown.vue'
import { useTranslation } from '@/composables/useTranslation'

const { t } = useTranslation()
const router = useRouter()

const userStore = useUserStore()
const sessionStore = useUserSessionStore()

const settingsOpen = ref(false)
const profileOpen = ref(false)

const currentUser = computed(() =>
  userStore.users.find(u => u.id === sessionStore.user?.id) || sessionStore.user
)

function toggleSettings() {
  settingsOpen.value = !settingsOpen.value
  profileOpen.value = false
}

function toggleProfile() {
  profileOpen.value = !profileOpen.value
  settingsOpen.value = false
}

function logout() {
  sessionStore.clearSession()
  router.push('/login')
}

onMounted(async () => {
  if (sessionStore.user?.is_admin) {
    await userStore.fetchUsers()
  }
})
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
