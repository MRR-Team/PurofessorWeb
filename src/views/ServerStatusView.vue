<template>
  <div class="text-center pt-24">
    <h1 class="heading-1 mb-6">{{ t.serverStatusTitle }}</h1>

    <div class="mb-4">
      <label class="font-bold">Wybierz region:</label>
      <select v-model="selectedRegion" class="input p-2 border rounded ml-2">
        <option value="euw1">EUW</option>
        <option value="na1">NA</option>
        <option value="tr1">TR</option>
      </select>
      <button @click="loadStatus" class="ml-2 bg-primary text-white px-4 py-2 rounded">Pobierz status</button>
    </div>

    <div v-if="isLoading" class="text-body">Ładowanie statusu...</div>
    <div v-if="error" class="text-danger">{{ error }}</div>

    <div v-if="statusData" class="mt-4 text-left max-w-lg mx-auto bg-bg-card p-4 rounded shadow">
      <pre class="text-sm whitespace-pre-wrap">{{ statusData }}</pre>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRiotStatusUseCase } from '@/application/usecases/RiotStatusUseCase'
import { useTranslation } from '@/composables/useTranslation'

const { t } = useTranslation()
const { fetchStatus } = useRiotStatusUseCase()

const selectedRegion = ref('euw1')
const statusData = ref<any>(null)
const isLoading = ref(false)
const error = ref<string | null>(null)

async function loadStatus() {
  isLoading.value = true
  error.value = null
  statusData.value = null

  try {
    statusData.value = await fetchStatus(selectedRegion.value)
  } catch (err: any) {
    if (err?.response?.status === 401) {
      error.value = 'Brak autoryzacji.'
    } else {
      error.value = 'Nie udało się pobrać statusu serwera.'
    }
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
.input {
  @apply text-sm;
}
</style>
