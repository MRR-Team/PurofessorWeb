import { useUserSessionStore } from '@/stores/userSessionStore';
import { UserApiService } from './userApiService';
import { UserPersistenceService } from './userPersistenceService';

export async function updateProfile(name: string, email: string): Promise<void> {
  const store = useUserSessionStore();
  const user = store.user;

  if (!user) throw new Error('Brak danych użytkownika');

  store.setLoading(true);
  store.setError(null);

  try {
    const updatedUser = await UserApiService.updateProfile(user.id, { name, email });
    store.setUser(updatedUser);
    UserPersistenceService.saveUser(updatedUser);
  } catch (e: any) {
    const msg = e?.response?.data?.message || e.message || 'Wystąpił nieznany błąd';
    store.setError(msg);
    throw new Error(msg);
  } finally {
    store.setLoading(false);
  }
}
