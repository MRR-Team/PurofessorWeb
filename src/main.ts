import { createApp, provide } from 'vue';
import App from './App.vue';
import { createPinia } from 'pinia';
import router from './router';
import { championService } from '@/services/championService';
import './assets/tailwind.css'

import { useUserSessionStore } from '@/stores/userSessionStore';
import { UserPersistenceService } from '@/services/userPersistenceService.ts';

const app = createApp(App);
app.use(createPinia());
app.use(router);

const store = useUserSessionStore();
const persistedUser = UserPersistenceService.getUser();
const persistedToken = UserPersistenceService.getToken();

if (persistedUser && persistedToken) {
  store.setUser(persistedUser);
  store.setToken(persistedToken);
}

app.provide('championService', championService);

app.mount('#app');
