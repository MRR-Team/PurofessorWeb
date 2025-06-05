<template>
  <TextWrapper>
    <BackgroundWrapper>
      <div class="w-full max-w-7xl px-4 py-6 mx-auto pt-24">
        <div class="card max-w-2xl mx-auto">
          <h1 class="heading-1 mb-4">Witaj w panelu użytkownika</h1>

          <p class="text-body">
            Jesteś zalogowany jako:
            <strong>{{ store.user?.name }}</strong> ({{ store.user?.email }})
          </p>

          <p class="text-sm text-muted mt-2">
            Twoja rola:
            <code>{{ getReadableRole(store.user) }}</code>
          </p>
        </div>
      </div>
    </BackgroundWrapper>
  </TextWrapper>
</template>

<script setup lang="ts">
import { useUserSessionStore } from '@/stores/userSessionStore'
import BackgroundWrapper from '@/components/layout/BackgroundWrapper.vue'
import TextWrapper from '@/components/layout/TextWrapper.vue'
import type { User } from '@/models/User'

const store = useUserSessionStore()

function getReadableRole(user: User | null): string {
  if (!user) return ''
  return user.is_admin ? 'Administrator' : 'Użytkownik'
}
</script>
