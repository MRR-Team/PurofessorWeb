import type { Champion } from '@/models/Champion'
import { useTranslation } from '@/composables/useTranslation'

export function getChampionImageUrl(champion: Champion): string {
  return champion.photo
}

export function getReadableLane(role: string): string {
  const { t } = useTranslation()

  switch (role) {
    case 'top': return t.value.roleTop
    case 'jungle': return t.value.roleJungle
    case 'mid': return t.value.roleMid
    case 'bot': return t.value.roleBot
    case 'support': return t.value.roleSupport
    default: return role
  }
}
