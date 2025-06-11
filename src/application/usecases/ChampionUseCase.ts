import { ChampionService } from '@/application/services/ChampionService.ts'
import { useChampionStore } from '@/stores/championStore'
import {useTranslation} from "@/composables/useTranslation.ts";
const { t } = useTranslation()

export function useChampionUseCase() {
  const championService = new ChampionService()
  const championStore = useChampionStore()

  async function fetchChampions() {
    championStore.setLoading(true)
    championStore.setError(null)

    try {
      const champions = await championService.loadChampions()
      championStore.setChampions(champions)
    } catch (err: any) {
      championStore.setError(err?.message || t.value.failedToDownloadChampions)
    } finally {
      championStore.setLoading(false)
    }
  }

  return {
    fetchChampions
  }
}
