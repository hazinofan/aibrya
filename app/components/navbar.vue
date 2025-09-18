<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";

const scrolled = ref(false);

function onScroll() {
  scrolled.value = window.scrollY > 10;
}

onMounted(() => {
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
});
onBeforeUnmount(() => window.removeEventListener("scroll", onScroll));
</script>

<template>
  <!-- Fixed header -->
  <header
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
    :class="
      scrolled
        ? 'bg-black/60 backdrop-blur-md supports-[backdrop-filter]:bg-black/50 shadow-sm'
        : 'bg-transparent'
    "
  >
    <nav
      class="max-w-7xl mx-auto flex items-center justify-between px-6 py-4 text-white"
    >
      <!-- Brand -->
      <div class="flex items-center gap-2">
        <!-- Light mode logo -->
        <img
          src="/assets/light-logo.webp"
          alt="Aibrya Logo Light"
          class="w-36 block dark:hidden"
        />
        <!-- Dark mode logo -->
        <img
          src="/assets/logo.webp"
          alt="Aibrya Logo Dark"
          class="w-36 hidden dark:block"
        />
      </div>

      <!-- Center links -->

      <!-- CTA -->
      <div class="flex items-center gap-6">
        <div class="hidden md:flex items-center gap-6">
          <a href="#" class="hover:text-gray-300 text-lg">Product</a>
          <a href="#" class="hover:text-gray-300 text-lg">Solution</a>
          <a href="#" class="hover:text-gray-300 text-lg">Resources</a>
          <a href="#" class="hover:text-gray-300 text-lg">Pricing</a>
          <a href="#" class="hover:text-gray-300 text-lg">Log In</a>
        </div>
        <div class="">
          <a
            href="#"
            class="bg-emerald-400 text-black px-4 py-2 rounded-md font-medium hover:bg-emerald-500 transition"
          >
            Contact Us
          </a>
        </div>
      </div>
    </nav>
  </header>

  <!-- Demo spacer so you can scroll the page -->
  <div class="pt-20"></div>
</template>
