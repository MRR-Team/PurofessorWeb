<template>
  <div class="max-w-4xl mx-auto p-6 pt-24 text-center">
    <h1 class="heading-1 mb-6">Narzędzie CounterPick</h1>

    <!-- AUTOCOMPLETE DROPDOWN -->
    <div class="relative mb-4 w-full">
      <BaseInput
        v-model="selectedEnemyChampion"
        placeholder="Wpisz nazwę championa przeciwnika..."
        class="w-full"
        @input="onInputChange"
        @keydown.enter.prevent="onEnter"
        @focus="showDropdown = true"
        @blur="onBlur"
      />
      <ul
        v-if="showDropdown && filteredChampions.length > 0"
        class="absolute bg-bg-card border rounded w-full mt-1 max-h-60 overflow-y-auto text-left z-10"
      >
        <li
          v-for="champion in filteredChampions"
          :key="champion.id"
          class="px-4 py-2 cursor-pointer hover:bg-primary hover:text-white"
          @mousedown.prevent="selectChampion(champion.name)"
        >
          {{ champion.getDisplayName() }}
        </li>
      </ul>
    </div>

    <!-- ROLES -->
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

    <!-- BUTTON -->
    <button
      @click="generateCounterAction"
      :disabled="!selectedEnemyChampion || !selectedRole"
      class="mt-4 px-6 py-2 bg-primary text-white rounded hover:bg-primary/90 transition disabled:opacity-50 disabled:cursor-not-allowed"
    >
      Wygeneruj kontrę
    </button>

    <!-- RESULTS -->
    <div v-if="isLoading" class="mt-6 text-body">Ładowanie kontr...</div>

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
import { ref, computed, onMounted } from 'vue'
import { useCounterPickUseCase } from '@/services/usecases/CounterPickUseCase'
import { useChampionStore } from '@/stores/championStore'
import BaseInput from '@/components/shared/BaseInput.vue'
import CardChampion from '@/components/champions/CardChampion.vue'
import type { Champion } from '@/models/Champion'
import { nextTick } from 'vue'
const { generateCounter } = useCounterPickUseCase()
const championStore = useChampionStore()

const selectedEnemyChampion = ref('')
const selectedRole = ref('')
const roles = ['support', 'bot', 'mid', 'jungle', 'top']

const counterChampions = ref<Champion[]>([])
const isLoading = ref(false)
const error = ref<string | null>(null)
const showDropdown = ref(false)

onMounted(async () => {
  if (championStore.champions.length === 0) {
    await championStore.fetchChampions()
  }
})

const filteredChampions = computed(() => {
  return championStore.champions.filter(c =>
    c.name.toLowerCase().includes(selectedEnemyChampion.value.trim().toLowerCase())
  )
})

function selectChampion(name: string) {
  selectedEnemyChampion.value = name
  showDropdown.value = false
  nextTick(() => {
    showDropdown.value = false
  })
}

function onInputChange() {
  showDropdown.value = !!selectedEnemyChampion.value
}

function onEnter() {
  if (filteredChampions.value.length > 0) {
    selectChampion(filteredChampions.value[0].name)
    nextTick(() => {
      showDropdown.value = false
    })
  }
}

function onBlur() {
  // Delay hide to allow click event to process
  setTimeout(() => {
    showDropdown.value = false
  }, 150)
}

async function generateCounterAction() {
  isLoading.value = true
  error.value = null
  counterChampions.value = []

  try {
    const enemyChampion = championStore.champions.find(c =>
      c.name.toLowerCase() === selectedEnemyChampion.value.trim().toLowerCase()
    )

    if (!enemyChampion) {
      error.value = 'Nie znaleziono takiego championa.'
      return
    }

    counterChampions.value = await generateCounter(selectedRole.value, enemyChampion.id.toString())
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
