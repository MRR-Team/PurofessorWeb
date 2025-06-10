import { CounterRepository } from '@/repositories/CounterRepository'
import type { Champion } from '@/models/Champion'

export function useCounterPickUseCase() {
  async function generateCounter(role: string, enemyChampionId: string): Promise<Champion[]> {
    return CounterRepository.fetchCounter(role, enemyChampionId)
  }

  return {
    generateCounter
  }
}
