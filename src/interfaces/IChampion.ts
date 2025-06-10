export interface IChampion {
  id: number
  photo: string
  name: string
  position: string
  role: string
  isAvailable: boolean

  attack_damage: boolean
  magic_damage: boolean
  shield: boolean
  heals: boolean
  tanky: boolean
  squishy: boolean
  has_cc: boolean
  dash: boolean
  poke: boolean
  can_one_shot: boolean
  late_game: boolean

  is_good_against_attack_damage: boolean
  is_good_against_magic_damage: boolean
  is_good_against_shield: boolean
  is_good_against_heals: boolean
  is_good_against_tanky: boolean
  is_good_against_squish: boolean
  is_good_against_has_cc: boolean
  is_good_against_dash: boolean
  is_good_against_poke: boolean
  is_good_against_can_one_shot: boolean
  is_good_against_late_game: boolean
}
