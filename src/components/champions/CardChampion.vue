<template>
  <div class="champion-card card hover:shadow-lg transition flex flex-col items-center p-4">
    <img
      :src="getChampionImageUrl(champion)"
      alt="Champion image"
      class="w-24 h-24 object-cover mb-3 rounded-full shadow"
    />
    <h2 class="text-lg font-semibold text-heading mb-1">{{ champion.getDisplayName() }}</h2>
    <p class="text-sm text-muted mb-2">{{ getReadableLane(champion.role) }}</p>
    <p
      class="mt-2 text-sm font-medium"
      :class="champion.isAvailable ? 'text-green-600' : 'text-muted'"
    >
      {{ champion.isAvailable ? t.inRotation : t.outOfRotation }}
    </p>
  </div>
</template>

<script setup lang="ts">
import type { Champion } from '@/models/Champion'
import { useTranslation } from '@/composables/useTranslation'
const { t } = useTranslation()
const props = defineProps<{
  champion: Champion
}>()

function getReadableLane(role: string): string {
  switch (role) {
    case 'top': return t.value.roleTop
    case 'jungle': return t.value.roleJungle
    case 'mid': return t.value.roleMid
    case 'bot': return t.value.roleBot
    case 'support': return t.value.roleSupport
    default: return role
  }
}


function getChampionImageUrl(champion: Champion): string {
  const imageName = champion.name.toLowerCase().replace(/ /g, '')
  return `/images/champions/${imageName}.png`
}
</script>

<style scoped>
.champion-card {
  min-height: 280px;
}
</style>
