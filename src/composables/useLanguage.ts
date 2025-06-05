import { computed } from 'vue'
import { useUiStore } from '@/stores/uiStore'

export function useLanguage() {
  const store = useUiStore()

  const language = computed({
    get: () => store.language,
    set: (value: string) => store.setLanguage(value)
  })

  function switchLanguage(newLang: string) {
    store.setLanguage(newLang)
  }

  return {
    language,
    switchLanguage
  }
}
