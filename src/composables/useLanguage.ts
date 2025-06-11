import { computed } from 'vue'
import { useUiStore } from '@/stores/uiStore'
import { LanguagePersistenceAdapter } from '@/services/adapters/LanguagePersistenceAdapter'

export function useLanguage() {
  const store = useUiStore()

  const language = computed({
    get: () => store.language,
    set: (value: string) => {
      store.setLanguage(value)
      LanguagePersistenceAdapter.saveLanguage(value)
    }
  })
  return {
    language
  }
}
