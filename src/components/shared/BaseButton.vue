<template>
  <button
    :type="type"
    class="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
defineProps<{
  type?: 'submit' | 'button' | 'reset'
}>()
</script>
