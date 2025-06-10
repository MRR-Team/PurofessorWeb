<template>
  <div class="max-w-5xl mx-auto p-6 pt-24 text-center">
    <h1 class="heading-1 mb-6">{{ t.menuRotation }}</h1>

    <div v-if="isLoading" class="text-body mb-4">{{ t.statsLoading }}</div>
    <div v-else-if="error" class="text-danger mb-4">{{ error }}</div>

    <div v-else class="flex flex-wrap justify-center gap-4">
      <div
        v-for="champion in champions"
        :key="champion.id"
        class="bg-bg-card p-4 rounded shadow w-48 text-left"
      >
        <div class="flex items-center mb-2">
          <input
            type="checkbox"
            :checked="champion.isAvailable"
            @change="toggleChampionAvailabilityAction(champion)"
            class="mr-2"
          />
          <span class="font-semibold">{{ champion.getDisplayName() }}</span>
        </div>

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
import { ref, onMounted } from 'vue'
import { useChampionStore } from '@/stores/championStore'
import type { Champion } from '@/models/Champion'
import { useTranslation } from '@/composables/useTranslation'
import { useChampionAdminUseCase } from '@/services/usecases/ChampionAdminUseCase'
import {getChampionImageUrl, getReadableLane} from "@/utils/ChampionUtils.ts";

const { t } = useTranslation()
const championStore = useChampionStore()
const { toggleChampionAvailability } = useChampionAdminUseCase()

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
async function toggleChampionAvailabilityAction(champion: Champion) {
  try {
    await toggleChampionAvailability(champion.id)
    champion.isAvailable = !champion.isAvailable
  } catch (err) {
    console.error('Błąd podczas zmiany dostępności championa:', err)
    alert('Nie udało się zmienić dostępności championa.')
  }
}
</script>
