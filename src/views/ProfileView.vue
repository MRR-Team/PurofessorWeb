<template>
  <div class="card p-6 max-w-2xl mx-auto">
    <h1 class="heading-1 mb-4">{{ t.profileTitle }}</h1>
    <table class="w-full text-sm text-left border-collapse mb-6">
      <thead>
      <tr class="bg-primary text-white">
        <th class="p-2 border">{{ t.usersTableName }}</th>
        <th class="p-2 border">{{ t.usersTableEmail }}</th>
        <th class="p-2 border">{{ t.password }}</th>
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
import { onMounted, ref } from 'vue'
import { useTranslation } from '@/composables/useTranslation'
import { useUserSessionStore } from '@/stores/userSessionStore'
import { useProfileUseCase } from '@/application/usecases/ProfileUseCase'
import UserProfileRow from '@/components/shared/UserProfileRow.vue'
import { UserPersistenceAdapter } from '@/application/adapters/UserPersistenceAdapter'

const { t } = useTranslation()
const sessionStore = useUserSessionStore()
const { updateProfile, validateProfileData, fetchCurrentUser } = useProfileUseCase()

const editingUserId = ref<number | null>(null)
const currentUser = ref(sessionStore.user)

onMounted(async () => {
  if (sessionStore.user) {
    currentUser.value = await fetchCurrentUser(sessionStore.user.id)
    sessionStore.setUser(currentUser.value)
    UserPersistenceAdapter.saveUser(currentUser.value)
  }
})

function startEdit(user: typeof currentUser.value) {
  if (user) {
    editingUserId.value = user.id
  }
}

async function saveEdit(userId: number, name: string, email: string, password: string) {
  if (!name.trim() || !email.trim()) {
    alert('Name and Email cannot be empty!')
    return
  }

  const validationError = validateProfileData(name, email)
  if (validationError) {
    alert(validationError)
    return
  }

  try {
    const updatedUser = await updateProfile(userId, name, email)
    currentUser.value = updatedUser
    sessionStore.setUser(updatedUser)
    UserPersistenceAdapter.saveUser(updatedUser)

    editingUserId.value = null
  } catch (e: any) {
    alert(e.message || 'Error updating user')
  }
}
</script>

