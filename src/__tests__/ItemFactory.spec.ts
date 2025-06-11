import { describe, it, expect } from 'vitest'
import { ItemFactory } from '@/domain/factories/ItemFactory'
import type { IItem } from '@/domain/interfaces/IItem'

describe('ItemFactory', () => {
  it('should create Item model from API data', () => {
    const apiData: IItem = {
      id: 1,
      name: 'Infinity Edge',
      role: 'adc',
      attack_damage: true,
      magic_damage: false,
      shield: false,
      heals: false,
      tanky: false,
      squishy: false,
      has_cc: false,
      dash: false,
      poke: false,
      can_one_shot: true,
      late_game: true,
      is_good_against_attack_damage: true,
      is_good_against_magic_damage: false,
      is_good_against_shield: false,
      is_good_against_heals: false,
      is_good_against_tanky: true,
      is_good_against_squish: true,
      is_good_against_has_cc: false,
      is_good_against_dash: true,
      is_good_against_poke: false,
      is_good_against_can_one_shot: true,
      is_good_against_late_game: true
    }

    const item = ItemFactory.fromApi(apiData)

    expect(item.id).toBe(apiData.id)
    expect(item.name).toBe(apiData.name)
    expect(item.role).toBe(apiData.role)
    expect(item.getDisplayName()).toBe(apiData.name)
  })
})
