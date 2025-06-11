<template>
  <div class="flex items-center justify-center min-h-screen px-4">
    <div class="card w-full max-w-md text-center">
      <h1 class="heading-1 mb-6">{{t.registerSuccessTitle}}</h1>

      <p class="text-body mb-4">
        {{t.pleaseVerifyYour}}
      </p>

      <RouterLink
        to="/login"
        class="mt-4 inline-block px-6 py-2 bg-primary text-white rounded hover:bg-primary/90 transition"
      >
        {{t.goToLogin}}
      </RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import {useTranslation} from "@/composables/useTranslation.ts";
const { t } = useTranslation()

</script>
