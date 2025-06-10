<template>
  <div class="max-w-4xl mx-auto p-6 pt-24 text-center">
    <h1 class="heading-1 mb-6">{{ t.statsTitle }}</h1>

    <div v-if="isLoading" class="mb-4 text-body">{{ t.statsLoading }}</div>
    <div v-else-if="error" class="mb-4 text-danger">{{ error }}</div>

    <table v-else class="w-full bg-bg-card rounded shadow text-left border border-muted">
      <thead class="bg-primary text-white">
      <tr>
        <th class="px-4 py-2">{{ t.statsTableChampion }}</th>
        <th class="px-4 py-2 text-right">{{ t.statsTableCount }}</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="stat in stats" :key="getChampionKey(stat)" class="border-t border-muted">
        <td class="px-4 py-2">{{ getChampionName(stat) }}</td>
        <td class="px-4 py-2 text-right">{{ stat.total }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useTranslation } from '@/composables/useTranslation'
import { useStatsUseCase } from '@/services/usecases/StatsUseCase'
import type { CounterStat } from '@/repositories/StatsRepository'

const { t } = useTranslation()
const { fetchCounterStats } = useStatsUseCase()

const stats = ref<CounterStat[]>([])
const isLoading = ref(false)
const error = ref<string | null>(null)

onMounted(async () => {
  isLoading.value = true
  error.value = null

  try {
    stats.value = await fetchCounterStats()
  } catch (err: any) {
    error.value = err?.message || 'Nie udało się pobrać statystyk.'
  } finally {
    isLoading.value = false
  }
})

function getChampionName(stat: CounterStat): string {
  return stat.champion?.name || ''
}

function getChampionKey(stat: CounterStat): number {
  return stat.champion?.id
}
</script>
