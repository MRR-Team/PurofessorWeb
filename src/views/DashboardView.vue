<template>
  <div class="w-full max-w-7xl px-4 py-6 mx-auto pt-24">
    <div class="card max-w-2xl mx-auto">
      <h1 class="heading-1 mb-4">{{ t.dashboardTitle }}</h1>

      <p class="text-body">
        {{ t.loggedInAs }}
        <strong>{{ currentUser?.name }}</strong> ({{ currentUser?.email }})
      </p>

      <p class="text-sm text-muted mt-2">
        {{ t.yourRole }}
        <code>{{ getReadableRole() }}</code>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useUserStore } from '@/stores/userStore'
import { useUserSessionStore } from '@/stores/userSessionStore'
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
