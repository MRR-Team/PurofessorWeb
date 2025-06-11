import { CounterService } from '@/application/services/CounterService.ts'
import type { Champion } from '@/domain/models/Champion'

export function useCounterPickUseCase() {
  const counterService = new CounterService()

  async function generateCounter(role: string, enemyChampionId: string): Promise<Champion[]> {
    return counterService.loadCounter(role, enemyChampionId)
  }

  return {
    generateCounter
  }
}
