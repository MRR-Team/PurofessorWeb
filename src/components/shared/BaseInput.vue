<template>
  <input
    :type="type"
    :placeholder="placeholder"
    :value="modelValue"
    @input="onInput"
    class="p-2 border rounded w-full"
  />
</template>

<script setup lang="ts">
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
