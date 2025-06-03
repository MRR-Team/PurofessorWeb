<template>
  <input
    :type="type"
    :placeholder="placeholder"
    :value="modelValue"
    @input="onInput"
    class="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600
           bg-white dark:bg-gray-800 text-gray-900 dark:text-white
           placeholder-gray-400 dark:placeholder-gray-500
           focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
  />
</template>

<script setup lang="ts">
defineOptions({
  inheritAttrs: false,
})

const props = defineProps<{
  modelValue: string
  type?: string
  placeholder?: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

function onInput(event: Event) {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}
</script>
