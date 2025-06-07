<template>
  <TextWrapper>
    <BackgroundWrapper>
      <div class="max-w-6xl mx-auto p-6 pt-24">
        <h1 class="heading-1 mb-6">Lista Championów</h1>

        <div class="flex flex-col sm:flex-row gap-4 mb-6">
          <BaseInput v-model="search" placeholder="Szukaj postaci..." class="flex-1" />
          <select v-model="selectedRole" class="input !bg-bg-card !text-body w-full sm:w-64">
            <option value="">Wszystkie linie</option>
            <option v-for="role in roles" :key="role" :value="role">
              {{ getReadableLane(role) }}
            </option>
          </select>
        </div>

        <div v-if="isLoading" class="text-body">Ładowanie championów...</div>

        <div v-else-if="error" class="text-danger">
          {{ error }}
        </div>

        <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <CardChampion
            v-for="champion in displayedChampions"
            :key="champion.id"
            :champion="champion"
          />
        </div>
      </div>
    </BackgroundWrapper>
  </TextWrapper>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useChampionStore } from '@/stores/championStore'
import { useChampionSearch } from '@/composables/useChampionSearch'
import BaseInput from '@/components/shared/BaseInput.vue'
import BackgroundWrapper from '@/components/layout/BackgroundWrapper.vue'
import TextWrapper from '@/components/layout/TextWrapper.vue'
import CardChampion from '@/components/champions/CardChampion.vue'

const store = useChampionStore()

onMounted(() => {
  store.fetchChampions()
})

const {
  search,
  selectedRole,
  roles,
  displayedChampions
} = useChampionSearch(store.champions)

function getReadableLane(role: string): string {
  switch (role) {
    case 'top': return 'Góra'
    case 'jungle': return 'Dżungla'
    case 'mid': return 'Środek'
    case 'bot': return 'Dół'
    case 'support': return 'Support'
    default: return role
  }
}

const isLoading = store.isLoading
const error = store.error
</script>
