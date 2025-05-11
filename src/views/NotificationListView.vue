<template>
  <div class="max-w-4xl mx-auto p-6">
    <h1 class="text-2xl font-bold mb-4">Powiadomienia</h1>

    <div v-if="isLoading">Ładowanie powiadomień...</div>
    <div v-else-if="error" class="text-red-600">{{ error }}</div>

    <div v-else class="space-y-4">
      <div
        v-for="notification in notifications"
        :key="notification.id"
        class="border-l-4 p-4 rounded shadow bg-white"
        :class="{
          'border-blue-400': notification.type === 'info',
          'border-yellow-400': notification.type === 'warning',
          'border-red-500': notification.type === 'danger',
          'border-green-500': notification.type === 'update'
        }"
      >
        <div class="flex justify-between items-center">
          <h2 class="font-semibold">{{ notification.title }}</h2>
          <span class="text-sm text-gray-500">{{ notification.getFormattedDate() }}</span>
        </div>
        <p class="text-gray-700 mt-2">{{ notification.shortPreview() }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useNotificationStore } from '@/stores/notificationStore'
import { fetchNotifications } from '@/services/notificationService'

const store = useNotificationStore()
const { notifications, isLoading, error } = store

onMounted(() => {
  if (!notifications.length) {
    fetchNotifications()
  }
})
</script>
