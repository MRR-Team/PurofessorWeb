<template>
  <div class="relative">
    <button @click="toggleDropdown" class="navbar-button relative">
      🔔
      <span
        v-if="unreadCount > 0"
        class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1"
      >
        {{ unreadCount }}
      </span>
    </button>

    <div
      v-if="dropdownOpen"
      class="absolute right-0 mt-2 w-72 bg-bg-card text-body shadow-lg rounded-md p-4 z-50 border border-white/10"
    >
      <p v-if="notifications.length === 0" class="text-sm text-muted">
        {{ t.notificationsEmpty }}
      </p>

      <ul v-else class="flex flex-col gap-2 max-h-64 overflow-y-auto">
        <li
          v-for="notification in notifications.slice(0, 5)"
          :key="notification.id"
          class="border-b border-muted pb-2 text-sm"
        >
          <p class="font-semibold">{{ notification.title }}</p>
          <p class="text-xs text-muted">{{ notification.getFormattedDate() }}</p>
          <p class="text-xs">{{ notification.shortPreview() }}</p>
        </li>
      </ul>

      <RouterLink
        to="/notifications"
        class="block mt-2 text-center text-primary underline text-xs"
      >
        {{ t.viewAllNotifications }}
      </RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useNotificationStore } from '@/stores/notificationStore'
import { notificationUseCase } from '@/application/usecases/NotificationUseCase'
import { useTranslation } from '@/composables/useTranslation'
import { RouterLink } from 'vue-router'

const { t } = useTranslation()
const notificationStore = useNotificationStore()
const { fetchNotifications } = notificationUseCase()

const dropdownOpen = ref(false)

const notifications = computed(() => notificationStore.notifications)
const unreadCount = computed(() => notificationStore.notifications.length)

function toggleDropdown() {
  dropdownOpen.value = !dropdownOpen.value
}

onMounted(async () => {
  notificationStore.setLoading(true)
  try {
    const notificationsData = await fetchNotifications()
    notificationStore.setNotifications(notificationsData)
  } catch (e) {
    notificationStore.setError('Failed to load notifications.')
  } finally {
    notificationStore.setLoading(false)
  }
})
</script>

<style scoped>
.navbar-button {
  @apply bg-white/10 px-2 py-1 rounded hover:bg-white/20 transition relative;
}
</style>
