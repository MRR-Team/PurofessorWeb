<template>
  <button
    :type="type"
    :disabled="disabled"
    class="w-full px-4 py-2 font-semibold rounded-md
           bg-purple-600 text-white hover:bg-purple-700
           disabled:opacity-50 disabled:cursor-not-allowed
           transition"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
defineOptions({
  inheritAttrs: false
})

defineProps<{
  type?: 'submit' | 'button' | 'reset'
  disabled?: boolean
}>()
</script>
