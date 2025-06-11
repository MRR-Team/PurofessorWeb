<template>
  <div class="p-6">
    <h1 class="heading-1 mb-4">{{ t.usersTitle }}</h1>

    <UserTable :users="userStore.users" />

    <div v-if="userStore.isLoading" class="mt-4 text-body">{{ t.usersLoading }}</div>
    <div v-if="userStore.error" class="mt-4 text-danger">{{ userStore.error }}</div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useUserStore } from '@/stores/userStore'
import UserTable from '@/components/admin/UserTable.vue'
import { useTranslation } from '@/composables/useTranslation'
import { useUserUseCase } from '@/services/usecases/UserUseCase'

const { t } = useTranslation()
const userStore = useUserStore()
const { fetchUsers, updateUser } = useUserUseCase()

const editingUserId = ref<number | null>(null)

onMounted(async () => {
  const usersData = await fetchUsers()
  userStore.setUsers(usersData)
})

async function saveEdit(userId: number, name: string, email: string, password: string) {
  if (!name.trim() || !email.trim()) {
    alert('Name and Email cannot be empty!')
    return
  }

  const payload: any = { name, email }
  if (password.trim()) {
    payload.password = password
  }

  try {
    const updatedUser = await updateUser(userId, payload)
    userStore.updateUser(updatedUser)
    editingUserId.value = null
  } catch (e: any) {
    alert(e.message || 'Error updating user')
  }
}
</script>
