<template>
  <div class="max-w-md mx-auto mt-10 p-4 border rounded bg-white shadow">
    <h1 class="text-xl font-bold mb-4">Logowanie</h1>
    <form @submit.prevent="onLogin">
      <BaseInput v-model="email" type="email" placeholder="Email" class="mb-4" />
      <BaseInput v-model="password" type="password" placeholder="Hasło" class="mb-4" />
      <BaseButton type="submit" :disabled="isLoading">
        {{ isLoading ? 'Logowanie...' : 'Zaloguj' }}
      </BaseButton>
    </form>

    <p v-if="error" class="mt-4 text-sm text-red-600 text-center">
      {{ error }}
    </p>

    <p class="mt-4 text-sm text-center">
      Nie masz konta?
      <router-link to="/register" class="text-blue-600 underline">Zarejestruj się</router-link>
    </p>
    <p class="mt-2 text-sm text-center">
      Zapomniałeś hasła?
      <router-link to="/reset-password" class="text-blue-600 underline">Resetuj hasło</router-link>
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserSessionStore } from '@/stores/userSessionStore';
import { handleLogin } from '@/services/authViewService';
import BaseInput from '@/components/shared/BaseInput.vue';
import BaseButton from '@/components/shared/BaseButton.vue';
import axios from 'axios';

const email = ref('');
const password = ref('');
const error = ref<string | null>(null);

const router = useRouter();
const store = useUserSessionStore();
const isLoading = store.isLoading;

const onLogin = async () => {
  error.value = null;
  try {
    await handleLogin(email.value, password.value);
    if (!store.error) {
      router.push('/dashboard');
    } else {
      error.value = store.error;
    }
  } catch (e: unknown) {
    if (axios.isAxiosError(e)) {
      switch (e.response?.status) {
        case 401:
          error.value = 'Nieprawidłowy email lub hasło.';
          break;
        case 500:
          error.value = 'Błąd serwera. Spróbuj ponownie później.';
          break;
        default:
          error.value = e.response?.data?.message || 'Wystąpił błąd logowania.';
      }
    } else if (e instanceof Error) {
      error.value = e.message;
    } else {
      error.value = 'Wystąpił nieznany błąd.';
    }
  }
};
</script>
