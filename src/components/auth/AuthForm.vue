<template>
  <form @submit.prevent="submit" class="flex flex-col gap-4">
    <template v-for="field in fields" :key="field">
      <BaseInput
        v-model="form[field]"
        :type="getFieldType(field)"
        :placeholder="placeholders[field]"
      />
    </template>

    <BaseButton type="submit" :disabled="loading">
      {{ loading ? '...' : submitText }}
    </BaseButton>
  </form>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import BaseInput from '@/components/shared/BaseInput.vue'
import BaseButton from '@/components/shared/BaseButton.vue'
import { useTranslation } from '@/composables/useTranslation'
const { t } = useTranslation()
const props = defineProps<{
  fields: ('email' | 'password' | 'confirmPassword' | 'name')[]
  submitText: string
  loading?: boolean
}>()

const emit = defineEmits<{
  (e: 'submit', payload: Record<string, string>): void
}>()

const form = reactive<Record<string, string>>(
  Object.fromEntries(props.fields.map(field => [field, '']))
)

const placeholders: Record<string, string> = {
  email: t.value.email,
  password: t.value.password,
  confirmPassword: t.value.confirmPassword,
  name: t.value.namePlaceholder
}

const getFieldType = (field: string): string => {
  if (field.includes('password')) return 'password'
  if (field === 'email') return 'email'
  return 'text'
}

function submit() {
  emit('submit', { ...form })
}
</script>
