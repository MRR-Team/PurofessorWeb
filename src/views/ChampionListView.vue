<template>
  <div class="max-w-4xl mx-auto p-6">
    <h1 class="text-2xl font-bold mb-4">Lista Championów</h1>

    <div v-if="isLoading">Ładowanie championów...</div>
    <div v-else-if="error" class="text-red-600">{{ error }}</div>

    <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      <div
        v-for="champion in champions"
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
import { onMounted } from 'vue'
import { useChampionStore } from '@/stores/championStore'

const store = useChampionStore()
const { champions, isLoading, error } = store

onMounted(() => {
  if (!champions.length) {
    store.fetchChampions()
  }
})
</script>
