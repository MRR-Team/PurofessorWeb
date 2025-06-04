<template>
  <div class="flex items-center justify-center min-h-screen px-4">
    <div class="card w-full max-w-md">
      <h1 class="heading-1 text-center mb-6">Rejestracja</h1>

      <form @submit.prevent="onRegister" class="flex flex-col gap-4">
        <BaseInput v-model="name" type="text" placeholder="Imię" />
        <BaseInput v-model="email" type="email" placeholder="Email" />
        <BaseInput v-model="password" type="password" placeholder="Hasło" />
        <BaseInput v-model="confirmPassword" type="password" placeholder="Potwierdź hasło" />
        <BaseButton type="submit" :disabled="isLoading">
          {{ isLoading ? 'Rejestruję...' : 'Zarejestruj' }}
        </BaseButton>
      </form>

      <p v-if="error" class="mt-4 text-sm text-danger text-center">{{ error }}</p>
      <p class="mt-4 text-sm text-center">
        Masz już konto?
        <RouterLink to="/login" class="text-primary underline">Zaloguj się</RouterLink>
      </p>
    </div>
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
