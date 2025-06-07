import { createApp, provide } from 'vue';
import App from './App.vue';
import { createPinia } from 'pinia';
import router from './router';
import { ChampionService } from '@/services/ChampionService.ts';
import './assets/tailwind.css'

import { useUserSessionStore } from '@/stores/userSessionStore';
import { UserPersistenceAdapter } from '@/services/adapters/UserPersistenceAdapter.ts';

const app = createApp(App);
app.use(createPinia());
app.use(router);

const store = useUserSessionStore();
const persistedUser = UserPersistenceAdapter.getUser();
const persistedToken = UserPersistenceAdapter.getToken();

if (persistedUser && persistedToken) {
  store.setUser(persistedUser);
  store.setToken(persistedToken);
}

app.provide('championService', ChampionService);

app.mount('#app');
