<template>
  <div class="flex gap-2">
    <button
      v-if="!isEditing"
      class="px-2 py-1 bg-primary text-white rounded"
      @click="$emit('startEdit')"
    >
      {{ t.usersButtonEdit }}
    </button>

    <button
      v-if="isEditing"
      class="px-2 py-1 bg-green-600 text-white rounded"
      @click="$emit('saveEdit')"
    >
      {{ t.saveChanges }}
    </button>

    <button
      v-if="showDelete"
      class="px-2 py-1 bg-red-500 text-white rounded"
      @click="$emit('deleteUser')"
    >
      {{ t.usersButtonDelete }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { useTranslation } from '@/composables/useTranslation'

defineProps<{
  isEditing: boolean
  showDelete: boolean
}>()

defineEmits<{
  (e: 'startEdit'): void
  (e: 'saveEdit'): void
  (e: 'deleteUser'): void
}>()

const { t } = useTranslation()
</script>
