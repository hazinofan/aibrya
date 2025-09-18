<script setup lang="ts">
import ThemeToggle from './components/ThemeToggle.vue';

</script>

<template>
  <NuxtLayout>
    <div class="min-h-dvh bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
      <NuxtPage />
      <ClientOnly><ThemeToggle /></ClientOnly>
    </div>
  </NuxtLayout>
</template>
