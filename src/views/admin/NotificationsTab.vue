<template>
  <div>
    <h1 class="heading-1 mb-4">{{t.notifications}}</h1>

    <div v-if="isLoading" class="text-body">{{t.loadingNotifications}}</div>
    <div v-else-if="error" class="text-danger">{{ error }}</div>

    <div v-else-if="notifications.length === 0" class="text-muted">
      {{ t.noNotifications }}
    </div>

    <div v-else class="space-y-4 mt-4">
      <div
        v-for="notification in notifications"
        :key="notification.id"
        class="border-l-4 p-4 rounded shadow bg-bg-card text-body"
        :class="{
          'border-blue-400': notification.type === 'info',
          'border-yellow-400': notification.type === 'warning',
          'border-red-500': notification.type === 'danger',
          'border-green-500': notification.type === 'update'
        }"
      >
        <div class="flex justify-between items-center">
          <h2 class="font-semibold">{{ notification.title }}</h2>
          <span class="text-xs text-muted">
            {{ notification.getFormattedDate() }}
          </span>
        </div>
        <p class="text-sm mt-1">{{ notification.shortPreview() }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useNotificationStore } from '@/stores/notificationStore'
import { notificationUseCase } from '@/application/usecases/NotificationUseCase.ts'
import {useTranslation} from "@/composables/useTranslation.ts";
const { t } = useTranslation()

const store = useNotificationStore()
const { fetchNotifications } = notificationUseCase()

const { notifications, isLoading, error } = store

onMounted(() => {
  if (!notifications.length) {
    fetchNotifications()
  }
})
</script>
