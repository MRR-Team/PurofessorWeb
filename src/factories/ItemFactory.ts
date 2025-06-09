import type { IItem } from '@/interfaces/IItem'
import { Item } from '@/models/Item'

export class ItemFactory {
  static fromApi(data: IItem): Item {
    return new Item(
      data.id,
      data.name,
      data.role,
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
