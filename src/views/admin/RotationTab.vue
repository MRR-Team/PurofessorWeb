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
import { ref, onMounted, computed } from 'vue'
import { useChampionStore } from '@/stores/championStore'
import { Champion } from '@/domain/models/Champion'
import { useTranslation } from '@/composables/useTranslation'
import { useChampionAdminUseCase } from '@/application/usecases/ChampionAdminUseCase'
import { getChampionImageUrl, getReadableLane } from '@/utils/ChampionUtils'

const { t } = useTranslation()
const championStore = useChampionStore()
const { toggleChampionAvailability, reloadChampions } = useChampionAdminUseCase()

const champions = computed(() => championStore.champions)
const isLoading = ref(false)
const error = ref<string | null>(null)

onMounted(async () => {
  isLoading.value = true
  try {
    const championsData = await reloadChampions()
    championStore.setChampions(championsData)
  } catch (err) {
    error.value = 'Nie udało się pobrać championów.'
  } finally {
    isLoading.value = false
  }
})

async function toggleChampionAvailabilityAction(champion: Champion) {
  try {
    await toggleChampionAvailability(champion.id)
    championStore.updateChampion(
      new Champion(
        champion.id,
        champion.photo,
        champion.name,
        champion.position,
        champion.role,
        !champion.isAvailable, // zmieniamy isAvailable
        champion.attack_damage,
        champion.magic_damage,
        champion.shield,
        champion.heals,
        champion.tanky,
        champion.squishy,
        champion.has_cc,
        champion.dash,
        champion.poke,
        champion.can_one_shot,
        champion.late_game,
        champion.is_good_against_attack_damage,
        champion.is_good_against_magic_damage,
        champion.is_good_against_shield,
        champion.is_good_against_heals,
        champion.is_good_against_tanky,
        champion.is_good_against_squish,
        champion.is_good_against_has_cc,
        champion.is_good_against_dash,
        champion.is_good_against_poke,
        champion.is_good_against_can_one_shot,
        champion.is_good_against_late_game
      )
    )
  } catch (err) {
    console.error('Błąd podczas zmiany dostępności championa:', err)
    alert('Nie udało się zmienić dostępności championa.')
  }
}
</script>
