<template>
  <div class="relative mb-4 w-full text-left">
    <label v-if="label" class="block mb-1 text-heading font-semibold">
      {{ label }}:
    </label>

    <BaseInput
      v-model="searchInput"
      :placeholder="placeholder"
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
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick, onMounted } from 'vue'
import BaseInput from '@/components/shared/BaseInput.vue'
import { useChampionStore } from '@/stores/championStore'
import type { Champion } from '@/models/Champion'

const props = defineProps<{
  modelValue: string
  label?: string
  placeholder?: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const championStore = useChampionStore()

const searchInput = ref(props.modelValue)
const showDropdown = ref(false)

onMounted(async () => {
  if (championStore.champions.length === 0) {
    await championStore.fetchChampions()
  }
})

const filteredChampions = computed(() => {
  return championStore.champions.filter(c =>
    c.name.toLowerCase().includes(searchInput.value.trim().toLowerCase())
  )
})

watch(
  () => props.modelValue,
  (newValue) => {
    searchInput.value = newValue
  }
)

function selectChampion(name: string) {
  searchInput.value = name
  emit('update:modelValue', name)
  showDropdown.value = false
  nextTick(() => {
    showDropdown.value = false
  })
}

function onInputChange() {
  showDropdown.value = !!searchInput.value
  emit('update:modelValue', searchInput.value)
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
  setTimeout(() => {
    showDropdown.value = false
  }, 150)
}
</script>
