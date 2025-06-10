<template>
  <AppWrapper>
    <BackgroundWrapper>
      <Navbar />
      <MainContent>
        <RouterView />
      </MainContent>
    </BackgroundWrapper>
  </AppWrapper>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppWrapper from '@/components/layout/AppWrapper.vue'
import BackgroundWrapper from '@/components/layout/BackgroundWrapper.vue'
import MainContent from '@/components/layout/MainContent.vue'
import Navbar from '@/components/layout/Navbar.vue'
import { useTheme } from '@/composables/useTheme'

useTheme()
</script>
