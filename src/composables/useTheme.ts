import { watch } from 'vue'
import { useUiStore } from '@/stores/uiStore'

export function useTheme() {
  const store = useUiStore()

  const applyTheme = (theme: string) => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  applyTheme(store.theme)

  watch(() => store.theme, applyTheme)
}
