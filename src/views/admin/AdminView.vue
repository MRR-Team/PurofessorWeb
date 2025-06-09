<template>
  <div class="min-h-screen bg-bg-page text-body">
    <AdminTabs />
    <div class="p-6">
      <RouterView />
    </div>
  </div>
</template>

<script setup lang="ts">
import AdminTabs from '@/components/admin/AdminTabs.vue'
import { RouterView } from 'vue-router'
</script>
