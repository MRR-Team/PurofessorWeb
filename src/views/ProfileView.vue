<template>
  <form @submit.prevent="handleSave" class="max-w-md mx-auto p-6 border rounded shadow bg-white">
    <h1 class="text-xl font-bold mb-4">{{ t.profileTitle }}</h1>

    <BaseInput v-model="name" type="text" :placeholder="t.namePlaceholder" class="mb-4" />
    <BaseInput v-model="email" type="email" :placeholder="t.emailPlaceholder" class="mb-4" />

    <BaseButton :disabled="isLoading" type="submit">
      {{ isLoading ? t.saving : t.saveChanges }}
    </BaseButton>

    <p v-if="success" class="text-sm text-green-600 mt-4">{{ t.savedSuccess }}</p>
    <p v-if="error" class="text-sm text-red-600 mt-4">{{ error }}</p>
  </form>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import BaseInput from '@/components/shared/BaseInput.vue'
import BaseButton from '@/components/shared/BaseButton.vue'
import { useTranslation } from '@/composables/useTranslation'
const { t } = useTranslation()

import { useUserSessionStore } from '@/stores/userSessionStore'
import { UserService } from '@/services/UserService'

const store = useUserSessionStore()

const { user, isLoading, error } = store

const name = ref('')
const email = ref('')
const success = ref(false)

onMounted(() => {
  if (user) {
    name.value = user.name
    email.value = user.email
  }
})

watch(() => store.user, updated => {
  if (updated) {
    name.value = updated.name
    email.value = updated.email
  }
})

function validate(): boolean {
  success.value = false

  if (!name.value.trim()) {
    store.setError(t.value.requiredName)
    return false
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!email.value.trim() || !emailPattern.test(email.value)) {
    store.setError(t.value.invalidEmail)
    return false
  }

  return true
}

async function handleSave() {
  success.value = false

  if (!validate()) return

  try {
    await updateProfile(name.value, email.value)
    name.value = store.user?.name ?? ''
    email.value = store.user?.email ?? ''
    success.value = true
  } catch {
    success.value = false
  }
}

</script>
