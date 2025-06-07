<template>
      <div class="max-w-4xl mx-auto p-6 pt-24 text-center">
        <h1 class="heading-1 mb-6">Narzędzie CounterPick</h1>

        <BaseInput
          v-model="selectedEnemyChampion"
          placeholder="Wpisz nazwę championa przeciwnika..."
          class="mb-4 w-full"
        />

        <div class="mb-6">
          <p class="mb-2 text-heading font-semibold">Wybierz pozycję:</p>
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
          @click="generateCounter"
          :disabled="!selectedEnemyChampion || !selectedRole"
          class="mt-4 px-6 py-2 bg-primary text-white rounded hover:bg-primary/90 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Wygeneruj kontrę
        </button>

        <div v-if="isLoading" class="mt-6 text-body">Ładowanie kontr...</div>

        <div v-else-if="error" class="mt-6 text-danger">{{ error }}</div>

        <div v-else-if="counterChampions.length > 0" class="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div
            v-for="champion in counterChampions"
            :key="champion"
            class="card text-center py-4"
          >
            {{ champion }}
          </div>
        </div>
      </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { CounterRepository } from '@/repositories/CounterRepository.ts'
import BaseInput from '@/components/shared/BaseInput.vue'


const selectedEnemyChampion = ref('')
const selectedRole = ref('')
const roles = ['support', 'bot', 'mid', 'jungle', 'top']

const counterChampions = ref<string[]>([])
const isLoading = ref(false)
const error = ref<string | null>(null)

async function generateCounter() {
  isLoading.value = true
  error.value = null
  counterChampions.value = []

  try {
    counterChampions.value = await CounterRepository.fetchCounter(selectedRole.value, selectedEnemyChampion.value)
  } catch (err) {
    error.value = 'Nie udało się pobrać kontr.'
  } finally {
    isLoading.value = false
  }
}

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
</script>
