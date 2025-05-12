import { describe, it, expect } from 'vitest'
import { ChampionFactory } from '@/factories/ChampionFactory'
import { Champion } from '@/models/Champion'
import type { IChampion } from '@/interfaces/IChampion'

describe('ChampionFactory', () => {
  it('should create a Champion instance from API data', () => {
    const data: IChampion = {
      id: 1,
      name: 'Aatrox',
      title: 'the Darkin Blade',
      role: 'fighter',
      difficulty: 'moderate',
      image: 'aatrox.png',
      inRotation: true,
      counters: ['Teemo'],
      recommendedItems: ['Death\'s Dance'],
      patchNotes: 'Buffed healing'
    }

    const champion = ChampionFactory.fromApi(data)

    expect(champion).toBeInstanceOf(Champion)
    expect(champion.name).toBe('Aatrox')
    expect(champion.getDisplayName()).toBe('Aatrox, the Darkin Blade')
    expect(champion.isAvailable()).toBe(true)
  })
})
