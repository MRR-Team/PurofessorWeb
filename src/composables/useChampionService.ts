import { inject } from 'vue'

export function useChampionService() {
  const service = inject('championService') as {
    fetchChampions: () => Promise<void>
  }

  if (!service) throw new Error('Brak wstrzykniętego ChampionService')
  return service
}
