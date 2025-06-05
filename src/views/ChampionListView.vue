<template>
  <TextWrapper>
    <BackgroundWrapper>
      <div class="max-w-6xl mx-auto p-6 pt-24">
        <h1 class="heading-1 mb-6">Lista Championów</h1>

        <div class="flex flex-col sm:flex-row gap-4 mb-6">
          <BaseInput v-model="search" placeholder="Szukaj postaci..." class="flex-1" />
          <select
            v-model="selectedRole"
            class="input !bg-bg-card !text-body w-full sm:w-64"
          >
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
          <div
            v-for="champion in displayedChampions"
            :key="champion.id"
            class="card hover:shadow-lg transition"
          >
            <h2 class="text-lg font-semibold text-heading mb-1">
              {{ champion.getDisplayName() }}
            </h2>
            <p class="text-sm text-muted">
              {{ getReadableLane(champion.role) }} • {{ champion.difficulty }}
            </p>
            <p
              class="mt-2 text-sm font-medium"
              :class="champion.isAvailable() ? 'text-green-600' : 'text-muted'"
            >
              {{ champion.isAvailable() ? 'W rotacji' : 'Poza rotacją' }}
            </p>
          </div>
        </div>
      </div>
    </BackgroundWrapper>
  </TextWrapper>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useChampionStore } from '@/stores/championStore'
import { useChampionService } from '@/composables/useChampionService'
import { SearchByName, SearchByRole } from '@/strategies/SearchStrategy'
import type { SearchStrategy } from '@/strategies/SearchStrategy'
import { Champion } from '@/models/Champion'
import BaseInput from '@/components/shared/BaseInput.vue'
import BackgroundWrapper from '@/components/layout/BackgroundWrapper.vue'
import TextWrapper from '@/components/layout/TextWrapper.vue'

const search = ref('')
const selectedRole = ref('')
const roles = ['top', 'jungle', 'mid', 'bot', 'support']

const store = useChampionStore()
const { fetchChampions } = useChampionService()
const { champions, isLoading, error } = store

const strategy = computed<SearchStrategy>(() => {
  return selectedRole.value
    ? new SearchByRole(selectedRole.value)
    : new SearchByName()
})

const displayedChampions = computed<Champion[]>(() =>
  strategy.value.search(search.value, champions).map(c =>
    new Champion(
      c.id,
      c.name,
      c.title,
      c.role,
      c.difficulty,
      c.image,
      c.inRotation,
      c.counters,
      c.recommendedItems,
      c.patchNotes
    )
  )
)


function getReadableLane(role: string): string {
  switch (role) {
    case 'top':
      return 'Góra'
    case 'jungle':
      return 'Dżungla'
    case 'mid':
      return 'Środek'
    case 'bot':
      return 'Dół'
    case 'support':
      return 'Support'
    default:
      return role
  }
}
</script>
