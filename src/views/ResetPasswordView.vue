<template>
  <div class="flex items-center justify-center min-h-screen px-4">
    <div class="card w-full max-w-md">
      <h1 class="heading-1 text-center mb-6">{{ t.resetTitle }}</h1>

      <AuthForm
        :fields="['email']"
        :submitText="t.resetSubmit"
        :loading="isLoading"
        @submit="onReset"
      />

      <p v-if="success" class="mt-4 text-sm text-green-600 text-center">
        {{ t.resetSuccess }}
      </p>

      <p v-if="error" class="mt-4 text-sm text-danger text-center">{{ t.resetError }}</p>

      <p class="mt-4 text-sm text-center">
        {{ t.rememberPassword }}
        <RouterLink to="/login" class="text-primary underline">{{ t.loginNow }}</RouterLink>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthUseCase } from '@/application/usecases/AuthUseCase'
import AuthForm from '@/components/auth/AuthForm.vue'
import { useTranslation } from '@/composables/useTranslation'
import { ValidatorUtils } from '@/utils/ValidatorUtils'

const { t } = useTranslation()
const { resetPassword } = useAuthUseCase()

const isLoading = ref(false)
const success = ref(false)
const error = ref<string | null>(null)

const onReset = async (form: Record<string, string>) => {
  isLoading.value = true
  error.value = null
  success.value = false

  const validationError = validateResetForm(form)
  if (validationError) {
    error.value = validationError
    isLoading.value = false
    return
  }

  try {
    await resetPassword(form.email)
    success.value = true
  } catch (e: any) {
    error.value = e.message || t.value.resetError
  } finally {
    isLoading.value = false
  }
}

function validateResetForm(form: Record<string, string>): string | null {
  return ValidatorUtils.validateEmail(form.email)
}
</script>
