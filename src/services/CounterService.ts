import { CounterRepository } from '@/repositories/CounterRepository'

export class CounterService {
  static async getCounter(role: string, enemyChampion: string): Promise<string[]> {
    return CounterRepository.fetchCounter(role, enemyChampion)
  }
}
