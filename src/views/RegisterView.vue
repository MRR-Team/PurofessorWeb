<template>
  <div class="max-w-md mx-auto mt-10 p-4 border rounded bg-white shadow">
    <h1 class="text-xl font-bold mb-4">Rejestracja</h1>

    <form @submit.prevent="onRegister">
      <BaseInput v-model="name" type="text" placeholder="Imię" class="mb-4" />
      <BaseInput v-model="email" type="email" placeholder="Email" class="mb-4" />
      <BaseInput v-model="password" type="password" placeholder="Hasło" class="mb-4" />
      <BaseInput v-model="confirmPassword" type="password" placeholder="Potwierdź hasło" class="mb-4" />
      <BaseButton type="submit" :disabled="isLoading">
        {{ isLoading ? 'Rejestruję...' : 'Zarejestruj' }}
      </BaseButton>
    </form>

    <p v-if="error" class="mt-4 text-sm text-red-600 text-center">
      {{ error }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { handleRegister } from '@/services/authViewService';
import BaseInput from '@/components/shared/BaseInput.vue';
import BaseButton from '@/components/shared/BaseButton.vue';

const name = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const error = ref<string | null>(null);
const isLoading = ref(false);
const router = useRouter();

const onRegister = async () => {
  error.value = null;
  isLoading.value = true;

  try {
    await handleRegister(name.value, email.value, password.value, confirmPassword.value);
    router.push('/login');
  } catch (e: any) {
    if (e.message === 'Hasła się nie zgadzają') {
      error.value = 'Hasła się nie zgadzają';
    } else if (e?.response?.status === 422) {
      error.value = 'Podany email już istnieje lub dane są niepoprawne';
    } else {
      error.value = 'Błąd rejestracji';
    }
  } finally {
    isLoading.value = false;
  }
};
</script>
