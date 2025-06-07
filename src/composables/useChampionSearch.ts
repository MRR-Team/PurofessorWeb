import { ref, computed } from 'vue'
import type { Champion } from '@/models/Champion'
import {
  SearchByName,
  SearchByRole,
  type SearchStrategy
} from '@/strategies/ChampionSearchStrategy'

export function useChampionSearch(champions: Champion[]) {
  const search = ref('')
  const selectedRole = ref('')
  const roles = ['top', 'jungle', 'mid', 'bot', 'support']

  const strategy = computed<SearchStrategy<Champion>>(() => {
    return selectedRole.value
      ? new SearchByRole(selectedRole.value)
      : new SearchByName()
  })

  const displayedChampions = computed(() =>
    strategy.value.search(search.value, champions)
  )

  return {
    search,
    selectedRole,
    roles,
    displayedChampions
  }
}
