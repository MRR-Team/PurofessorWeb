<template>
  <div class="navbar-user-dropdown">
    <p class="text-sm font-semibold text-heading">👤 Użytkownik</p>
    <p class="text-xs text-muted">Imię: {{ user?.name }}</p>
    <p class="text-xs text-muted">Email: {{ user?.email }}</p>
    <p class="text-xs text-muted">Rola: <span class="font-semibold">{{ getReadableRole(user) }}</span></p>

    <RouterLink
      to="/profile"
      class="mt-2 w-full text-center bg-primary/90 hover:bg-primary text-white text-xs py-1 rounded transition"
    >
      Przejdź do profilu
    </RouterLink>
  </div>
</template>

<script setup lang="ts">
import { useUserSessionStore } from '@/stores/userSessionStore'
import { RouterLink } from 'vue-router'
import type { User } from '@/models/User'

const store = useUserSessionStore()
const user = store.user

function getReadableRole(user: User | null): string {
  if (!user) return ''
  return user.is_admin ? 'Administrator' : 'Użytkownik'
}
</script>

<style scoped>
.navbar-user-dropdown {
  @apply absolute top-full right-0 mt-2 bg-bg-card text-body shadow-lg rounded-md p-4 z-50 min-w-[220px] flex flex-col gap-2 border border-white/10;
}
</style>
