import { RiotStatusRepository } from '@/infrastructure/repositories/RiotStatusRepository'

export class RiotStatusService {
  constructor(private readonly riotStatusRepository = RiotStatusRepository) {}

  async loadStatus(region: string): Promise<any> {
    return this.riotStatusRepository.fetchStatus(region)
  }
}
