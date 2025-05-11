<template>
  <div class="max-w-4xl mx-auto p-6">
    <h1 class="text-2xl font-bold mb-4">Lista Championów</h1>

    <div class="flex flex-col sm:flex-row gap-4 mb-6">
      <BaseInput v-model="search" placeholder="Szukaj postaci..." class="flex-1" />

      <select v-model="selectedRole" class="border px-4 py-2 rounded w-full sm:w-64">
        <option value="">Wszystkie role</option>
        <option v-for="role in roles" :key="role" :value="role">{{ role }}</option>
      </select>
    </div>

    <div v-if="isLoading">Ładowanie championów...</div>
    <div v-else-if="error" class="text-red-600">{{ error }}</div>

    <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      <div
        v-for="champion in filteredChampions"
        :key="champion.id"
        class="p-4 border rounded shadow hover:shadow-md transition"
      >
        <h2 class="text-lg font-semibold">{{ champion.getDisplayName() }}</h2>
        <p class="text-sm text-gray-600">{{ champion.role }} • {{ champion.difficulty }}</p>
        <p v-if="champion.isAvailable()" class="text-green-600 mt-1">W rotacji</p>
        <p v-else class="text-gray-400 mt-1">Poza rotacją</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useChampionStore } from '@/stores/championStore'
import { useChampionService } from '@/composables/useChampionService'
import { SearchByName, SearchByRole } from '@/strategies/SearchStrategy'
import type { SearchStrategy } from '@/strategies/SearchStrategy'
import BaseInput from '@/components/shared/BaseInput.vue'

const search = ref('')
const selectedRole = ref('')
const roles = ['fighter', 'tank', 'mage', 'assassin', 'marksman', 'support']

const store = useChampionStore()
const { fetchChampions } = useChampionService()
const { champions, isLoading, error } = store

const strategy = computed<SearchStrategy>(() => {
  if (selectedRole.value) {
    return new SearchByRole(selectedRole.value)
  }
  return new SearchByName()
})

const filteredChampions = computed(() =>
  strategy.value.search(search.value, champions)
)

onMounted(() => {
  if (!champions.length) {
    fetchChampions()
  }
})
</script>
