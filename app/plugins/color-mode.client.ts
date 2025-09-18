import { defineNuxtPlugin, useState } from 'nuxt/app'

type Mode = 'dark' | 'light'
const STORAGE_KEY = 'theme'

export default defineNuxtPlugin(() => {
  const theme = useState<Mode>('theme', () => 'dark')

  const apply = (mode: Mode) => {
    if (!process.client) return
    const root = document.documentElement
    root.classList.toggle('dark', mode === 'dark')
    root.setAttribute('data-theme', mode) // harmless; useful if you add DaisyUI later
  }

  const get = () => theme.value
  const set = (next: Mode) => {
    theme.value = next
    if (process.client) {
      apply(next)
      localStorage.setItem(STORAGE_KEY, next)
    }
  }

  if (process.client) {
    let saved = (localStorage.getItem(STORAGE_KEY) as Mode | null) ?? 'dark'
    if (saved !== 'dark' && saved !== 'light') saved = 'dark'
    theme.value = saved
    apply(saved)
  }

  return { provide: { theme: { get, set } } }
})
