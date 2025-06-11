import type { Champion } from '@/domain/models/Champion.ts'
import { CounterRepository } from '@/infrastructure/repositories/CounterRepository.ts'

export class CounterService {
  constructor(private readonly counterRepository = CounterRepository) {}

  async loadCounter(role: string, enemyChampionId: string): Promise<Champion[]> {
    return this.counterRepository.fetchCounter(role, enemyChampionId)
  }
}
