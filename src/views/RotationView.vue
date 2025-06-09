<template>
  <div class="max-w-5xl mx-auto p-6 pt-24 text-center">
    <h1 class="heading-1 mb-6">{{ t.menuRotation }}</h1>

    <div v-if="isLoading" class="text-body mb-4">{{ t.statsLoading }}</div>
    <div v-else-if="error" class="text-danger mb-4">{{ error }}</div>

    <div v-else class="flex flex-wrap justify-center gap-4">
      <div
        v-for="champion in availableChampions"
        :key="champion.id"
        class="bg-bg-card p-4 rounded shadow w-48 text-left"
      >
        <div class="font-semibold mb-2">{{ champion.getDisplayName() }}</div>
        <p class="text-sm text-muted mb-2">{{ getReadableLane(champion.role) }}</p>
        <img
          :src="getChampionImageUrl(champion)"
          alt="Champion image"
          class="w-20 h-20 object-cover rounded-full mx-auto"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useChampionStore } from '@/stores/championStore'
import type { Champion } from '@/models/Champion'
import { useTranslation } from '@/composables/useTranslation'
const { t } = useTranslation()

const championStore = useChampionStore()

const champions = ref<Champion[]>([])
const isLoading = ref(false)
const error = ref<string | null>(null)

onMounted(async () => {
  isLoading.value = true
  try {
    await championStore.fetchChampions()
    champions.value = championStore.champions
  } catch (err) {
    error.value = 'Nie udało się pobrać championów.'
  } finally {
    isLoading.value = false
  }
})

const availableChampions = computed(() =>
  champions.value.filter(c => c.isAvailable)
)

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
