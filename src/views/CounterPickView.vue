<template>
  <div class="max-w-4xl mx-auto p-6 pt-24 text-center">
    <h1 class="heading-1 mb-6">{{ t.counterPickTitle }}</h1>

    <ChampionAutocomplete
      v-model="selectedEnemyChampion"
      :label="t.enemyChampionLabel"
    />

    <div class="mb-6">
      <p class="mb-2 text-heading font-semibold">{{ t.selectLane }}</p>
      <div class="flex flex-wrap justify-center gap-2">
        <button
          v-for="role in roles"
          :key="role"
          :class="['px-4 py-2 rounded border transition', selectedRole === role ? 'bg-primary text-white' : 'bg-bg-card text-body']"
          @click="selectedRole = role"
        >
          {{ getReadableLane(role) }}
        </button>
      </div>
    </div>

    <button
      @click="generateCounterAction"
      :disabled="!selectedEnemyChampion || !selectedRole"
      class="mt-4 px-6 py-2 bg-primary text-white rounded hover:bg-primary/90 transition disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {{ t.generateCounter }}
    </button>

    <div v-if="isLoading" class="mt-6 text-body">{{ t.loadingCounter }}</div>

    <div v-else-if="error" class="mt-6 text-danger">{{ error }}</div>

    <div v-else-if="counterChampions.length > 0" class="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      <CardChampion
        v-for="champion in counterChampions"
        :key="champion.id"
        :champion="champion"
      />
    </div>
  </div>
</template>


<script setup lang="ts">
import { ref } from 'vue'
import { useCounterPickUseCase } from '@/application/usecases/CounterPickUseCase'
import { useChampionStore } from '@/stores/championStore'
import CardChampion from '@/components/champions/CardChampion.vue'
import ChampionAutocomplete from '@/components/shared/ChampionAutocomplete.vue'
import type { Champion } from '@/domain/models/Champion'
import { useTranslation } from '@/composables/useTranslation'
import { getReadableLane } from '@/utils/ChampionUtils'

const { t } = useTranslation()
const { generateCounter } = useCounterPickUseCase()
const championStore = useChampionStore()

const selectedEnemyChampion = ref('')
const selectedRole = ref('')
const roles = ['support', 'bot', 'mid', 'jungle', 'top']

const counterChampions = ref<Champion[]>([])
const isLoading = ref(false)
const error = ref<string | null>(null)

function getChampionByName(name: string): Champion | undefined {
  return championStore.champions.find(c =>
    c.name.toLowerCase() === name.trim().toLowerCase()
  )
}

async function generateCounterAction() {
  isLoading.value = true
  error.value = null
  counterChampions.value = []

  try {
    const enemyChampion = getChampionByName(selectedEnemyChampion.value)

    if (!enemyChampion) {
      error.value = t.value.notFoundChampion
      return
    }

    counterChampions.value = await generateCounter(selectedRole.value, enemyChampion.id.toString())
  } catch (err) {
    error.value = t.value.errorCounter
  } finally {
    isLoading.value = false
  }
}
</script>

