<template>

      <div class="w-full max-w-7xl px-4 py-6 mx-auto pt-24">
        <div class="card max-w-2xl mx-auto">
          <h1 class="heading-1 mb-4">{{ t.dashboardTitle }}</h1>

          <p class="text-body">
            {{ t.loggedInAs }}
            <strong>{{ store.user?.name }}</strong> ({{ store.user?.email }})
          </p>

          <p class="text-sm text-muted mt-2">
            {{ t.yourRole }}
            <code>{{ getReadableRole(store.user) }}</code>
          </p>
        </div>
      </div>

</template>

<script setup lang="ts">
import { useUserSessionStore } from '@/stores/userSessionStore'
import type { User } from '@/models/User'
import { useTranslation } from '@/composables/useTranslation'
const { t } = useTranslation()
const store = useUserSessionStore()

function getReadableRole(user: User | null): string {
  if (!user) return ''
  return user.is_admin ? t.value.roleAdmin : t.value.roleUser
}
</script>
