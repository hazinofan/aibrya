import { defineNuxtConfig } from 'nuxt/config'
import Aura from '@primevue/themes/aura'   // 👈 import the theme preset

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  srcDir: 'app',

  css: ['~/assets/css/main.css', 'primeicons/primeicons.css'],

  modules: [
    '@primevue/nuxt-module'
  ],

  primevue: {
    options: {
      ripple: true,
      theme: {
        preset: Aura, 
        options: {
          darkModeSelector: '.dark'
        }
      }
    }
  },

  postcss: {
    plugins: {
      '@tailwindcss/postcss': {},
      autoprefixer: {}
    }
  },

  vite: {
    server: {
      watch: { usePolling: true, interval: 120 }
    }
  }
})
