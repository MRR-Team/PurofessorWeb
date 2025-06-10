<template>
  <div class="navbar-user-dropdown">
    <p class="text-sm font-semibold text-heading">👤 {{ t.profileTitle }}</p>
    <p class="text-xs text-muted">{{ t.namePlaceholder }}: {{ currentUser?.name }}</p>
    <p class="text-xs text-muted">{{ t.emailPlaceholder }}: {{ currentUser?.email }}</p>
    <p class="text-xs text-muted">
      {{ t.yourRole }}: <span class="font-semibold">{{ getReadableRole() }}</span>
    </p>

    <RouterLink
      to="/profile"
      class="mt-2 w-full text-center bg-primary/90 hover:bg-primary text-white text-xs py-1 rounded transition"
    >
      {{ t.profileTitle }}
    </RouterLink>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useUserStore } from '@/stores/userStore'
import { useUserSessionStore } from '@/stores/userSessionStore'
import { RouterLink } from 'vue-router'
import { useTranslation } from '@/composables/useTranslation'

const { t } = useTranslation()
const userStore = useUserStore()
const sessionStore = useUserSessionStore()

const currentUser = computed(() =>
  userStore.users.find(u => u.id === sessionStore.user?.id) || sessionStore.user
)

function getReadableRole(): string {
  if (!sessionStore.user) return ''
  return sessionStore.user.is_admin ? t.value.roleAdmin : t.value.roleUser
}

onMounted(async () => {
  if (sessionStore.user?.is_admin) {
    await userStore.fetchUsers()
  }
})
</script>

<style scoped>
.navbar-user-dropdown {
  @apply absolute top-full right-0 mt-2 bg-bg-card text-body shadow-lg rounded-md p-4 z-50 min-w-[220px] flex flex-col gap-2 border border-white/10;
}
</style>
