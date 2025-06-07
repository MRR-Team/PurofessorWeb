<template>
  <div class="max-w-md mx-auto p-6 border rounded shadow bg-red">
    <h1 class="text-xl font-bold mb-4">Twój profil</h1>

    <form @submit.prevent="handleSave">
      <BaseInput v-model="name" type="text" placeholder="Imię" class="mb-4" />
      <BaseInput v-model="email" type="email" placeholder="Email" class="mb-4" />
      <BaseButton :disabled="isLoading" type="submit">
        {{ isLoading ? 'Zapisuję...' : 'Zapisz zmiany' }}
      </BaseButton>
    </form>

    <p v-if="success" class="text-sm text-green-600 mt-4">Zapisano pomyślnie </p>
    <p v-if="error" class="text-sm text-red-600 mt-4">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import BaseInput from '@/components/shared/BaseInput.vue';
import BaseButton from '@/components/shared/BaseButton.vue';

import { useUserSessionStore } from '@/stores/userSessionStore';
import { updateProfile } from '@/services/profileViewService';

const store = useUserSessionStore();
const { user, isLoading, error } = store;

const name = ref('');
const email = ref('');
const success = ref(false);

onMounted(() => {
  if (user) {
    name.value = user.name;
    email.value = user.email;
  }
});

watch(() => store.user, updated => {
  if (updated) {
    name.value = updated.name;
    email.value = updated.email;
  }
});

function validate(): boolean {
  success.value = false;

  if (!name.value.trim()) {
    store.setError('Imię jest wymagane.');
    return false;
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email.value.trim() || !emailPattern.test(email.value)) {
    store.setError('Podaj poprawny adres e-mail.');
    return false;
  }

  return true;
}

async function handleSave() {
  success.value = false;

  if (!validate()) return;

  try {
    await updateProfile(name.value, email.value);
    success.value = true;
  } catch {
    success.value = false;
  }
}
</script>
