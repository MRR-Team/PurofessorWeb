import { describe, it, expect } from 'vitest'
import { ChampionFactory } from '@/domain/factories/ChampionFactory'
import type { IChampion } from '@/domain/interfaces/IChampion'

describe('ChampionFactory', () => {
  it('should create Champion model from API data', () => {
    const apiData: IChampion = {
      id: 1,
      photo: 'photo.jpg',
      name: 'Garen',
      position: 'top',
      role: 'fighter',
      isAvailable: true,
      attack_damage: true,
      magic_damage: false,
      shield: false,
      heals: false,
      tanky: true,
      squishy: false,
      has_cc: true,
      dash: false,
      poke: false,
      can_one_shot: false,
      late_game: true,
      is_good_against_attack_damage: true,
      is_good_against_magic_damage: false,
      is_good_against_shield: false,
      is_good_against_heals: false,
      is_good_against_tanky: true,
      is_good_against_squish: false,
      is_good_against_has_cc: true,
      is_good_against_dash: false,
      is_good_against_poke: false,
      is_good_against_can_one_shot: false,
      is_good_against_late_game: true
    }

    const champion = ChampionFactory.fromApi(apiData)

    expect(champion.id).toBe(apiData.id)
    expect(champion.name).toBe(apiData.name)
    expect(champion.role).toBe(apiData.role)
    expect(champion.getDisplayName()).toBe(apiData.name)
  })
})
