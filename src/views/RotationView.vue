<template>
  <div class="max-w-5xl mx-auto p-6 pt-24 text-center">
    <h1 class="heading-1 mb-6">{{ t.menuRotation }}</h1>

    <div v-if="isLoading" class="text-body mb-4">{{ t.statsLoading }}</div>
    <div v-else-if="error" class="text-danger mb-4">{{ error }}</div>

    <div v-else class="flex flex-wrap justify-center gap-4">
      <ChampionCard
        v-for="champion in availableChampions"
        :key="champion.id"
        :champion="champion"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useChampionStore } from '@/stores/championStore'
import { useTranslation } from '@/composables/useTranslation'
import { useChampionAdminUseCase } from '@/services/usecases/ChampionAdminUseCase'
import ChampionCard from '@/components/champions/ChampionCard.vue'

const { t } = useTranslation()
const championStore = useChampionStore()
const { reloadChampions } = useChampionAdminUseCase()

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

const availableChampions = computed(() =>
  champions.value.filter(c => c.isAvailable)
)
</script>
