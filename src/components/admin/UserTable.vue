<template>
  <table class="w-full text-sm text-left border-collapse mb-6">
    <thead>
    <tr class="bg-primary text-white">
      <th class="p-2 border">{{ t.usersTableId }}</th>
      <th class="p-2 border">{{ t.usersTableName }}</th>
      <th class="p-2 border">{{ t.usersTableEmail }}</th>
      <th class="p-2 border">Hasło</th>
      <th class="p-2 border">{{ t.usersTableActions }}</th>
    </tr>
    </thead>
    <tbody>
    <UserEditableRow
      v-for="user in users"
      :key="user.id"
      :user="user"
      :editingUserId="editingUserId"
      :showDelete="true"
      @startEdit="startEdit"
      @saveEdit="saveEdit"
      @deleteUser="deleteUser"
    />
    </tbody>
  </table>
</template>

<script setup lang="ts">
import type { User } from '@/models/User'
import { useUserStore } from '@/stores/userStore'
import { useTranslation } from '@/composables/useTranslation'
import { ref } from 'vue'
import UserEditableRow from '@/components/admin/UserEditableRow.vue'

const { t } = useTranslation()
const userStore = useUserStore()

defineProps<{
  users: User[]
}>()

const editingUserId = ref<number | null>(null)

function startEdit(user: User) {
  editingUserId.value = user.id
}

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
    await userStore.updateUser(userId, payload)
    await userStore.fetchUsers()
    editingUserId.value = null
  } catch (e: any) {
    alert(e.message || 'Error updating user')
  }
}

async function deleteUser(userId: number) {
  if (confirm('Czy na pewno chcesz usunąć użytkownika?')) {
    await userStore.deleteUser(userId)
  }
}
</script>
