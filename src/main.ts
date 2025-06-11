import { createApp } from 'vue';
import App from './App.vue';
import { createPinia } from 'pinia';
import router from './router';
import { ChampionService } from '@/services/ChampionService.ts';
import './assets/tailwind.css'
import { useUiStore } from '@/stores/uiStore'
import { ThemePersistenceAdapter } from '@/services/adapters/ThemePersistenceAdapter'
import { LanguagePersistenceAdapter } from '@/services/adapters/LanguagePersistenceAdapter'
import { useUserSessionStore } from '@/stores/userSessionStore';
import { UserPersistenceAdapter } from '@/services/adapters/UserPersistenceAdapter.ts';

const app = createApp(App);
app.use(createPinia());
app.use(router);
const uiStore = useUiStore()
const store = useUserSessionStore();
const persistedUser = UserPersistenceAdapter.getUser();
const persistedToken = UserPersistenceAdapter.getToken();
const savedTheme = ThemePersistenceAdapter.getTheme()
uiStore.setTheme(savedTheme)
document.documentElement.classList.toggle('dark', savedTheme === 'dark')
const savedLanguage = LanguagePersistenceAdapter.getLanguage()
uiStore.setLanguage(savedLanguage)

if (persistedUser && persistedToken) {
  store.setUser(persistedUser);
  store.setToken(persistedToken);
}

app.provide('championService', ChampionService);

app.mount('#app');
