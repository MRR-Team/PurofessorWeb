import { CounterRepository } from '@/repositories/CounterRepository'
import { ChampionFactory } from '@/factories/ChampionFactory'
import type { Champion } from '@/models/Champion'

export function useCounterPickUseCase() {
  async function generateCounter(role: string, enemyChampionId: string): Promise<Champion[]> {
    const response = await CounterRepository.fetchCounter(role, enemyChampionId)
    return response.map(champ => ChampionFactory.fromApi(champ))
  }

  return {
    generateCounter
  }
}
