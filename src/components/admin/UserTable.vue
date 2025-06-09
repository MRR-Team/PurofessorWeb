<template>
  <div>
    <table class="w-full text-sm text-left border-collapse mb-6">
      <thead>
      <tr class="bg-primary text-white">
        <th class="p-2 border">{{ t.usersTableId }}</th>
        <th class="p-2 border">{{ t.usersTableName }}</th>
        <th class="p-2 border">{{ t.usersTableEmail }}</th>
        <th class="p-2 border">{{ t.usersTableActions }}</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="user in users" :key="user.id" class="border-b">
        <td class="p-2 border">{{ user.id }}</td>

        <td class="p-2 border">
          <BaseInput v-if="editingUserId === user.id" v-model="editedName" type="text" />
          <span v-else>{{ user.name }}</span>
        </td>

        <td class="p-2 border">
          <BaseInput v-if="editingUserId === user.id" v-model="editedEmail" type="email" />
          <span v-else>{{ user.email }}</span>
        </td>

        <td class="p-2 border flex gap-2">
          <button
            v-if="editingUserId !== user.id"
            class="px-2 py-1 bg-primary text-white rounded"
            @click="startEdit(user)"
          >
            {{ t.usersButtonEdit }}
          </button>
          <button
            v-else
            class="px-2 py-1 bg-green-600 text-white rounded"
            @click="saveEdit(user)"
          >
            {{ t.saveChanges }}
          </button>

          <button class="px-2 py-1 bg-red-500 text-white rounded" @click="deleteUser(user.id)">
            {{ t.usersButtonDelete }}
          </button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import type { User } from '@/models/User'
import { useUserStore } from '@/stores/userStore'
import { useTranslation } from '@/composables/useTranslation'
import { ref } from 'vue'
import BaseInput from '@/components/shared/BaseInput.vue'

const { t } = useTranslation()
const userStore = useUserStore()

defineProps<{
  users: User[]
}>()

const editingUserId = ref<number | null>(null)
const editedName = ref('')
const editedEmail = ref('')

function startEdit(user: User) {
  editingUserId.value = user.id
  editedName.value = user.name
  editedEmail.value = user.email
}

async function saveEdit(user: User) {
  if (!editedName.value.trim() || !editedEmail.value.trim()) {
    alert('Name and Email cannot be empty!')
    return
  }

  try {
    await userStore.updateUser(user.id, {
      name: editedName.value,
      email: editedEmail.value
    })

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
