// types/nuxt-theme.d.ts
import type { NuxtApp } from 'nuxt/app'

declare module 'nuxt/app' {
  interface NuxtApp {
    $theme: {
      get: () => 'dark' | 'light'
      set: (next: 'dark' | 'light') => void
    }
  }
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $theme: NuxtApp['$theme']
  }
}
