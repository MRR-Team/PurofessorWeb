<template>
  <div class="max-w-md mx-auto p-6">
    <h1 class="text-xl font-bold mb-4">Twój profil</h1>

    <form @submit.prevent="handleSave">
      <BaseInput v-model="name" type="text" placeholder="Imię" class="mb-4" />
      <BaseInput v-model="email" type="email" placeholder="Email" class="mb-4" />
      <BaseButton type="submit">Zapisz zmiany</BaseButton>
    </form>

    <p class="text-sm text-green-600 mt-4" v-if="success">Zapisano pomyślnie.</p>
    <p class="text-sm text-red-600 mt-4" v-if="error">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useUserStore } from '@/stores/userStore'
import { UserRepository } from '@/repositories/UserRepository'
import BaseInput from '@/components/shared/BaseInput.vue'
import BaseButton from '@/components/shared/BaseButton.vue'

const store = useUserStore()
const user = store.user!

const name = ref(user.name)
const email = ref(user.email)
const success = ref(false)
const error = ref<string | null>(null)

async function handleSave() {
  success.value = false
  error.value = null

  try {
    const updatedUser = await UserRepository.update(user.id, {
      name: name.value,
      email: email.value
    })
    store.setUser(updatedUser, store.token)
    success.value = true
  } catch (e) {
    console.error(e)
    error.value = 'Nie udało się zapisać zmian.'
  }
}
</script>
