<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useNuxtApp } from 'nuxt/app'
type Mode = 'dark' | 'light'

const { $theme } = useNuxtApp()
const ready = ref(false)
const mode = ref<Mode>('light')

onMounted(() => {
  mode.value = $theme?.get?.() ?? 'light'
  ready.value = true
})

function toggle() {
  if (!ready.value) return
  const next: Mode = mode.value === 'dark' ? 'light' : 'dark'
  $theme?.set?.(next)
  mode.value = next
}
</script>

<template>
  <button v-if="ready" @click="toggle" class="fixed bottom-5 right-5 rounded-2xl border px-4 py-2">
    {{ mode === 'dark' ? 'Light mode' : 'Dark mode' }}
  </button>
</template>
