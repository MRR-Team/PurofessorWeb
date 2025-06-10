<template>
  <div class="max-w-4xl mx-auto p-6 pt-24 text-center">
    <h1 class="heading-1 mb-6">Logi systemowe</h1>

    <div v-if="isLoading" class="mb-4 text-body">Ładowanie logów...</div>
    <div v-else-if="error" class="mb-4 text-danger">{{ error }}</div>

    <ul v-else class="bg-bg-card rounded shadow text-left border border-muted p-4 space-y-2 text-sm">
      <li v-for="(log, index) in logs" :key="index" class="border-b border-muted py-1">
        {{ log }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useStatsUseCase } from '@/services/usecases/StatsUseCase'

const { fetchLogs } = useStatsUseCase()

const logs = ref<string[]>([])
const isLoading = ref(false)
const error = ref<string | null>(null)

onMounted(async () => {
  isLoading.value = true
  error.value = null

  try {
    logs.value = await fetchLogs()
  } catch (err: any) {
    error.value = err?.message || 'Nie udało się pobrać logów.'
  } finally {
    isLoading.value = false
  }
})
</script>
