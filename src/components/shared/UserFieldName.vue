<template>
  <BaseInput
    :modelValue="modelValue"
    @update:modelValue="$emit('update:modelValue', $event)"
    type="text"
  />
</template>

<script setup lang="ts">
import BaseInput from '@/components/shared/BaseInput.vue'

defineProps<{
  modelValue: string
}>()

defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()
</script>
