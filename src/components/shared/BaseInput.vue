<template>
  <input
    :type="type"
    :placeholder="placeholder"
    :value="modelValue"
    @input="handleInput"
    @keydown.enter="handleKeydownEnter"
    @focus="handleFocus"
    @blur="handleBlur"
    class="input"
  />
</template>

<script setup lang="ts">
defineOptions({ inheritAttrs: false })

defineProps<{
  modelValue: string
  type?: string
  placeholder?: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'input', event: Event): void
  (e: 'keydown.enter', event: KeyboardEvent): void
  (e: 'focus', event: FocusEvent): void
  (e: 'blur', event: FocusEvent): void
}>()

function handleInput(event: Event) {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
  emit('input', event)
}

function handleKeydownEnter(event: KeyboardEvent) {
  emit('keydown.enter', event)
}

function handleFocus(event: FocusEvent) {
  emit('focus', event)
}

function handleBlur(event: FocusEvent) {
  emit('blur', event)
}
</script>
