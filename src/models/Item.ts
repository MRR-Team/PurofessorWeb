import type {IItem} from "@/interfaces/IItem.ts";

export class Item implements IItem{
  constructor(
    public id: number,
    public name: string,
    public role: string,
    public attack_damage: boolean,
    public magic_damage: boolean,
    public shield: boolean,
    public heals: boolean,
    public tanky: boolean,
    public squishy: boolean,
    public has_cc: boolean,
    public dash: boolean,
    public poke: boolean,
    public can_one_shot: boolean,
    public late_game: boolean,
    public is_good_against_attack_damage: boolean,
    public is_good_against_magic_damage: boolean,
    public is_good_against_shield: boolean,
    public is_good_against_heals: boolean,
    public is_good_against_tanky: boolean,
    public is_good_against_squish: boolean,
    public is_good_against_has_cc: boolean,
    public is_good_against_dash: boolean,
    public is_good_against_poke: boolean,
    public is_good_against_can_one_shot: boolean,
    public is_good_against_late_game: boolean
  ) {}

  getDisplayName(): string {
    return this.name
  }
}
