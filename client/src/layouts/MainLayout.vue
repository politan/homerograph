// src/layouts/MainLayout.vue
<script setup lang="ts">
import Navbar from '@/components/Navbar.vue'
</script>

<template>
  <div class="min-h-screen bg-slate-50">
    <Navbar />
    <main class="container mx-auto px-4 py-8 max-w-5xl">
      <slot />
    </main>
  </div>
</template>