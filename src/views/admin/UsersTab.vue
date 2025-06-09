<template>
  <div class="p-6">
    <h1 class="heading-1 mb-4">{{ t.usersTitle }}</h1>

    <UserTable :users="userStore.users" />

    <div v-if="userStore.isLoading" class="mt-4 text-body">{{ t.usersLoading }}</div>
    <div v-if="userStore.error" class="mt-4 text-danger">{{ userStore.error }}</div>
  </div>
</template>


<script setup lang="ts">
import { onMounted } from 'vue'
import { useUserStore } from '@/stores/userStore'
import UserTable from '@/components/admin/UserTable.vue'
import { useTranslation } from '@/composables/useTranslation'
const { t } = useTranslation()
const userStore = useUserStore()

onMounted(async () => {
  await userStore.fetchUsers()
})
</script>
