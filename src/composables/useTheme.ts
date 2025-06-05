import { computed } from 'vue'
import { useUiStore } from '@/stores/uiStore'

export function useTheme() {
  const store = useUiStore()

  const isDark = computed(() => store.theme === 'dark')

  function toggleTheme(): void {
    store.setTheme(isDark.value ? 'light' : 'dark')
  }

  return {
    isDark,
    toggleTheme
  }
}
