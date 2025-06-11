<template>
  <div class="navbar-dropdown">
    <ThemeSwitcher />
    <LanguageSwitcher />

    <RouterLink
      v-if="isAdmin"
      to="/admin"
      class="mt-2 w-full text-center bg-primary/90 hover:bg-primary text-xs py-1 rounded transition text-red"
    >
      {{ t.adminPanel }}
    </RouterLink>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useUserStore } from '@/stores/userStore'
import { useUserSessionStore } from '@/stores/userSessionStore'
import { RouterLink } from 'vue-router'
import { useTranslation } from '@/composables/useTranslation'
import { useUserUseCase } from '@/application/usecases/UserUseCase'
import ThemeSwitcher from "@/components/ui/ThemeSwitcher.vue";
import LanguageSwitcher from "@/components/ui/LanguageSwitcher.vue";

const { t } = useTranslation()
const userStore = useUserStore()
const sessionStore = useUserSessionStore()
const { fetchUsers } = useUserUseCase()

computed(() =>
  userStore.users.find(u => u.id === sessionStore.user?.id) || sessionStore.user
)

const isAdmin = computed(() => sessionStore.user?.is_admin === true)


onMounted(async () => {
  if (sessionStore.user?.is_admin) {
    const usersData = await fetchUsers()
    userStore.setUsers(usersData)
  }
})
</script>

<style scoped>
.navbar-dropdown {
  @apply absolute top-full right-0 mt-2 bg-bg-card text-body shadow-lg rounded-md p-4 flex flex-col gap-2 z-50 min-w-[180px];
}
</style>
