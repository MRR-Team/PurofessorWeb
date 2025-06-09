<template>
  <div class="navbar-dropdown">
    <ThemeSwitcher />
    <LanguageSwitcher />

    <RouterLink
      v-if="isAdmin"
      to="/admin"
      class="mt-2 w-full text-center text-xs py-1 rounded transition text-red"
    >
      {{ t.adminPanel }}
    </RouterLink>
  </div>
</template>

<script setup lang="ts">
import ThemeSwitcher from '@/components/ui/ThemeSwitcher.vue'
import LanguageSwitcher from '@/components/ui/LanguageSwitcher.vue'
import { RouterLink } from 'vue-router'
import { useUserSessionStore } from '@/stores/userSessionStore'
import { useTranslation } from '@/composables/useTranslation'
const { t } = useTranslation()
const store = useUserSessionStore()
const isAdmin = store.user?.is_admin === true

</script>

<style scoped>
.navbar-dropdown {
  @apply absolute top-full right-0 mt-2 bg-bg-card text-body shadow-lg rounded-md p-4 flex flex-col gap-2 z-50 min-w-[180px];
}
</style>
