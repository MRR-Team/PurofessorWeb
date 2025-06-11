import { computed, watch } from 'vue'
import { useUiStore } from '@/stores/uiStore'
import { ThemePersistenceAdapter } from '@/services/adapters/ThemePersistenceAdapter'

export function useTheme() {
  const store = useUiStore()

  const isDark = computed(() => store.theme === 'dark')

  function toggleTheme(): void {
    const newTheme = isDark.value ? 'light' : 'dark'
    store.setTheme(newTheme)
    ThemePersistenceAdapter.saveTheme(newTheme)
    updateHtmlClass(newTheme)
  }

  function updateHtmlClass(theme: string) {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  updateHtmlClass(store.theme)

  watch(() => store.theme, (newTheme) => {
    updateHtmlClass(newTheme)
  })

  return {
    isDark,
    toggleTheme
  }
}
