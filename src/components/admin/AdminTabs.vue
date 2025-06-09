<template>
  <nav class="flex gap-4 px-6 py-4 bg-primary text-white text-sm shadow">
    <RouterLink to="/admin/rotation" class="tab" active-class="font-bold underline">{{
        t.menuRotation
      }}</RouterLink>
    <RouterLink to="/admin/stats" class="tab" active-class="font-bold underline">{{ t.adminMenuStats }}</RouterLink>
    <RouterLink to="/admin/users" class="tab" active-class="font-bold underline">{{ t.adminMenuUsers }}</RouterLink>
    <RouterLink to="/admin/notifications" class="tab" active-class="font-bold underline">{{ t.adminMenuNotifications }}</RouterLink>
  </nav>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useTranslation } from '@/composables/useTranslation'
const { t } = useTranslation()
</script>

<style scoped>
.tab {
  @apply hover:underline transition;
}
</style>
