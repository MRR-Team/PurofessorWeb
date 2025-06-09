import { computed } from 'vue'
import { useUiStore } from '@/stores/uiStore'
import { translations } from '@/i18n/translations'

export function useTranslation() {
  const store = useUiStore()

  const t = computed(() => {
    const lang = store.language
    return translations[lang as keyof typeof translations]
  })

  return {
    t
  }
}
