<template>
  <TextWrapper>
    <BackgroundWrapper>
      <Navbar />

      <div class="w-full max-w-7xl px-4 py-6 mx-auto pt-24">
        <RouterView />
      </div>
    </BackgroundWrapper>
  </TextWrapper>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import BackgroundWrapper from '@/components/layout/BackgroundWrapper.vue'
import TextWrapper from '@/components/layout/TextWrapper.vue'
import Navbar from '@/components/layout/Navbar.vue'
import { useTheme } from '@/composables/useTheme'
useTheme()
</script>
