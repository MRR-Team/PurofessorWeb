<template>
  <div class="card p-6 max-w-2xl mx-auto">
    <h1 class="heading-1 mb-4">{{ t.profileTitle }}</h1>
    <table class="w-full text-sm text-left border-collapse mb-6">
      <thead>
      <tr class="bg-primary text-white">
        <th class="p-2 border">{{ t.usersTableName }}</th>
        <th class="p-2 border">{{ t.usersTableEmail }}</th>
        <th class="p-2 border">Hasło</th>
        <th class="p-2 border">{{ t.usersTableActions }}</th>
      </tr>
      </thead>
      <tbody>
      <UserProfileRow
        v-if="currentUser"
        :user="currentUser"
        :editingUserId="editingUserId"
        :showDelete="false"
        @startEdit="startEdit"
        @saveEdit="saveEdit"
      />
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useTranslation } from '@/composables/useTranslation'
import { useUserSessionStore } from '@/stores/userSessionStore'
import { useUserStore } from '@/stores/userStore'
import UserProfileRow from "@/components/shared/UserProfileRow.vue";
import { UserService } from '@/services/UserService'
import type { User } from '@/models/User'

const { t } = useTranslation()
const userStore = useUserStore()
const sessionStore = useUserSessionStore()

const editingUserId = ref<number | null>(null)
const currentUser = ref<User | null>(null)

onMounted(async () => {
  try {
    if (sessionStore.user) {
      currentUser.value = await UserService.getCurrentUser(sessionStore.user.id)
    }
  } catch (e) {
    console.error('Failed to load current user', e)
  }
})

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
    const updatedUser = await UserService.updateUser(userId, payload)
    currentUser.value = updatedUser
    sessionStore.setUser(updatedUser)

    editingUserId.value = null
  } catch (e: any) {
    alert(e.message || 'Error updating user')
  }
}
</script>
