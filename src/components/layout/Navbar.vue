<template>
  <div class="navbar">
    <NavbarLinks />
    <NavbarUser />
  </div>
</template>

<script setup lang="ts">
import NavbarLinks from './NavbarLinks.vue'
import NavbarUser from './NavbarUser.vue'
</script>

<style scoped>
.navbar {
  @apply fixed top-0 left-0 z-50 w-full px-6 py-3 bg-primary text-white text-sm flex justify-between items-center;
}
</style>
