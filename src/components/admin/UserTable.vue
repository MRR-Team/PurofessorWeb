<template>
  <table class="w-full text-sm text-left border-collapse mb-6">
    <thead>
    <tr class="bg-primary text-white">
      <th class="p-2 border">{{ t.usersTableId }}</th>
      <th class="p-2 border">{{ t.usersTableName }}</th>
      <th class="p-2 border">{{ t.usersTableEmail }}</th>
      <th class="p-2 border">{{ t.password }}</th>
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
import type { User } from '@/domain/models/User'
import { useUserStore } from '@/stores/userStore'
import { useTranslation } from '@/composables/useTranslation'
import { ref, onMounted } from 'vue'
import UserEditableRow from '@/components/admin/UserEditableRow.vue'
import { useUserUseCase } from '@/application/usecases/UserUseCase'

const { t } = useTranslation()
const userStore = useUserStore()
const { fetchUsers, updateUser, deleteUser: deleteUserUseCase } = useUserUseCase()

const editingUserId = ref<number | null>(null)

onMounted(async () => {
  const usersData = await fetchUsers()
  userStore.setUsers(usersData)
})

const users = userStore.users

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
    const updatedUser = await updateUser(userId, payload)
    userStore.updateUser(updatedUser)
    editingUserId.value = null
  } catch (e: any) {
    alert(e.message || 'Error updating user')
  }
}

async function deleteUser(userId: number) {
  if (confirm('Czy na pewno chcesz usunąć użytkownika?')) {
    await deleteUserUseCase(userId)
    const usersData = await fetchUsers()
    userStore.setUsers(usersData)
  }
}
</script>
