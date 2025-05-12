<template>
  <div class="max-w-md mx-auto p-6 border rounded shadow bg-white">
    <h1 class="text-xl font-bold mb-4">Twój profil</h1>

    <form @submit.prevent="handleSave">
      <BaseInput
        v-model="name"
        type="text"
        placeholder="Imię"
        class="mb-4"
      />
      <BaseInput
        v-model="email"
        type="email"
        placeholder="Email"
        class="mb-4"
      />
      <BaseButton :disabled="isLoading" type="submit">
        {{ isLoading ? 'Zapisuję...' : 'Zapisz zmiany' }}
      </BaseButton>
    </form>

    <p v-if="success" class="text-sm text-green-600 mt-4">
      Zapisano pomyślnie ✅
    </p>
    <p v-if="error" class="text-sm text-red-600 mt-4">
      {{ error }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useUserStore } from '@/stores/userStore'
import BaseInput from '@/components/shared/BaseInput.vue'
import BaseButton from '@/components/shared/BaseButton.vue'

const store = useUserStore()
const { user, isLoading } = store

const name = ref('')
const email = ref('')
const error = ref<string | null>(null)
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
  if (!name.value.trim()) {
    error.value = 'Imię jest wymagane.'
    return false
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!email.value.trim() || !emailPattern.test(email.value)) {
    error.value = 'Podaj poprawny adres e-mail.'
    return false
  }

  return true
}

async function handleSave() {
  success.value = false
  error.value = null

  if (!validate()) return

  try {
    await store.updateProfile(name.value, email.value)

    if (!store.error) {
      success.value = true
    } else {
      error.value = store.error
    }
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.error(e.message)
      error.value = e.message
    } else {
      error.value = 'Wystąpił nieznany błąd.'
    }
  }
}
</script>
