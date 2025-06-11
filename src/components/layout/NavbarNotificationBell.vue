<template>
  <div class="relative">
    <button @click="toggleDropdown" class="navbar-button relative">
      🔔
      <span v-if="unreadCount > 0" class="absolute -top-1 -right-1 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
        {{ unreadCount }}
      </span>
    </button>

    <div v-if="dropdownOpen" class="absolute right-0 mt-2 w-64 bg-bg-card text-body shadow-lg rounded p-4 z-50 border border-white/10">
      <p class="font-semibold mb-2">{{t.notifications}}</p>
      <ul class="text-sm space-y-2 max-h-80 overflow-y-auto">
        <li v-for="notification in notifications" :key="notification.id" class="border-b pb-1">
          <div class="font-bold">{{ notification.title }}</div>
          <div class="text-muted text-xs">{{ notification.getFormattedDate() }}</div>
          <div class="text-sm mt-1">{{ notification.shortPreview() }}</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useNotificationStore } from '@/stores/notificationStore'
import { echo } from '@/infrastructure/realtime/echo'
import { useTranslation } from '@/composables/useTranslation'
import { NotificationFactory } from '@/domain/factories/NotificationFactory'

const { t } = useTranslation()
const notificationStore = useNotificationStore()

const dropdownOpen = ref(false)

const notifications = computed(() => notificationStore.notifications.slice().reverse().slice(0, 10))
const unreadCount = computed(() => notificationStore.notifications.length)

function toggleDropdown() {
  dropdownOpen.value = !dropdownOpen.value
}

onMounted(() => {
  echo.private(`App.Models.User.${localStorage.getItem('user_id')}`)
    .notification((notification: any) => {
      console.log('Received notification:', notification)

      const notificationModel = NotificationFactory.fromApi({
        id: notification.id || Date.now(),
        title: notification.title,
        content: notification.body || notification.content,
        type: notification.type || 'info',
        createdAt: notification.created_at || new Date().toISOString()
      })

      notificationStore.addNotification(notificationModel)
    })
})
</script>

<style scoped>
.navbar-button {
  @apply bg-white/10 px-2 py-1 rounded hover:bg-white/20 transition;
}
</style>
