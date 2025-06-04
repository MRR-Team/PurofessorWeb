<template>
  <button
    :type="type"
    :disabled="disabled"
    class="button w-full"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
defineOptions({ inheritAttrs: false })

defineProps<{
  type?: 'submit' | 'button' | 'reset'
  disabled?: boolean
}>()
</script>
