import type { Champion } from '@/models/Champion'
import { CounterRepository } from '@/repositories/CounterRepository'

export class CounterService {
  constructor(private readonly counterRepository = CounterRepository) {}

  async loadCounter(role: string, enemyChampionId: string): Promise<Champion[]> {
    return this.counterRepository.fetchCounter(role, enemyChampionId)
  }
}
