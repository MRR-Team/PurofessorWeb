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
import type { Champion } from '@/domain/models/Champion'
import { useTranslation } from '@/composables/useTranslation'
import { getChampionImageUrl, getReadableLane } from '@/utils/ChampionUtils'

const { t } = useTranslation()
defineProps<{
  champion: Champion
}>();
</script>

<style scoped>
.champion-card {
  min-height: 280px;
}
</style>
