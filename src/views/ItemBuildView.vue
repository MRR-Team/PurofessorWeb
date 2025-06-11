<template>
  <div class="max-w-4xl mx-auto p-6 pt-24 text-center">
    <h1 class="heading-1 mb-6">{{ t.buildTitle }}</h1>

    <ChampionAutocomplete
      v-model="selectedMyChampion"
      :label="t.myChampionLabel"
    />

    <ChampionAutocomplete
      v-model="selectedEnemyChampion"
      :label="t.enemyChampionLabel"
    />

    <button
      @click="generateBuildAction"
      :disabled="!selectedMyChampion || !selectedEnemyChampion"
      class="mt-4 px-6 py-2 bg-primary text-white rounded hover:bg-primary/90 transition disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {{ t.generateBuild }}
    </button>

    <div v-if="isLoading" class="mt-6 text-body">{{ t.loadingBuild }}</div>

    <div v-else-if="error" class="mt-6 text-danger">{{ error }}</div>

    <div v-else-if="buildItems.length > 0" class="mt-6 bg-bg-card text-left p-4 rounded shadow">
      <p class="text-heading mb-2 font-semibold">
        {{ t.buildSuggested }} {{ selectedMyChampion }} {{ t.enemyChampionLabel }} {{ selectedEnemyChampion }}:
      </p>
      <ul class="list-disc list-inside">
        <li v-for="item in buildItems" :key="item.id" class="font-semibold">
          {{ item.getDisplayName() }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useBuildUseCase } from '@/application/usecases/BuildUseCase'
import { useChampionStore } from '@/stores/championStore'
import ChampionAutocomplete from '@/components/shared/ChampionAutocomplete.vue'
import type { Item } from '@/domain/models/Item'
import { useTranslation } from '@/composables/useTranslation'

const { t } = useTranslation()
const { generateBuild } = useBuildUseCase()
const championStore = useChampionStore()
import type { Champion } from '@/domain/models/Champion'

const selectedMyChampion = ref('')
const selectedEnemyChampion = ref('')
const buildItems = ref<Item[]>([])
const isLoading = ref(false)
const error = ref<string | null>(null)

function getChampionByName(name: string): Champion | undefined {
  return championStore.champions.find(c =>
    c.name.toLowerCase() === name.trim().toLowerCase()
  )
}

async function generateBuildAction() {
  isLoading.value = true
  error.value = null
  buildItems.value = []

  try {
    const myChampion = getChampionByName(selectedMyChampion.value)
    const enemyChampion = getChampionByName(selectedEnemyChampion.value)

    if (!myChampion || !enemyChampion) {
      error.value = t.value.fetchBuildError
      return
    }

    buildItems.value = await generateBuild(myChampion.id.toString(), enemyChampion.id.toString())
  } catch (err: any) {
    if (err?.response?.status === 401 || err?.response?.status === 403) {
      error.value = t.value.loginRequiredToFetchBuild
    } else {
      error.value = t.value.fetchBuildError
    }
  } finally {
    isLoading.value = false
  }
}
</script>

