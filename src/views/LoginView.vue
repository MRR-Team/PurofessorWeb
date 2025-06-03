<template>
  <div class="min-h-screen flex items-center justify-center px-4">
    <div class="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl w-full max-w-md">
      <h1 class="text-2xl font-bold text-center mb-6 text-gray-900 dark:text-white">Logowanie</h1>

      <form @submit.prevent="onLogin" class="flex flex-col gap-4">
        <BaseInput v-model="email" type="email" placeholder="Email" />
        <BaseInput v-model="password" type="password" placeholder="Hasło" />
        <BaseButton type="submit" :disabled="isLoading">
          {{ isLoading ? 'Logowanie...' : 'Zaloguj' }}
        </BaseButton>
      </form>

      <p v-if="error" class="mt-4 text-sm text-red-600 text-center">{{ error }}</p>

      <p class="mt-4 text-sm text-center text-gray-700 dark:text-gray-300">
        Nie masz konta?
        <router-link to="/register" class="text-blue-500 underline">Zarejestruj się</router-link>
      </p>
      <p class="text-sm text-center text-gray-700 dark:text-gray-300">
        Zapomniałeś hasła?
        <router-link to="/reset-password" class="text-blue-500 underline">Resetuj hasło</router-link>
      </p>
    </div>
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
