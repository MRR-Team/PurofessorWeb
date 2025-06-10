import type { IChampion } from '@/interfaces/IChampion'
import { Champion } from '@/models/Champion'

export class ChampionFactory {
  static fromApi(data: IChampion): Champion {
    return new Champion(
      data.id,
      data.photo,
      data.name,
      data.position,
      data.role,
      data.isAvailable,
      data.attack_damage,
      data.magic_damage,
      data.shield,
      data.heals,
      data.tanky,
      data.squishy,
      data.has_cc,
      data.dash,
      data.poke,
      data.can_one_shot,
      data.late_game,
      data.is_good_against_attack_damage,
      data.is_good_against_magic_damage,
      data.is_good_against_shield,
      data.is_good_against_heals,
      data.is_good_against_tanky,
      data.is_good_against_squish,
      data.is_good_against_has_cc,
      data.is_good_against_dash,
      data.is_good_against_poke,
      data.is_good_against_can_one_shot,
      data.is_good_against_late_game
    )
  }
}
