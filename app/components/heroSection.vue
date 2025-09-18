<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";

const revealRoot = ref<HTMLElement | null>(null);
const revealImage = ref<HTMLElement | null>(null);
const visible = ref(false);

let observer: IntersectionObserver | null = null;

type SiteType = {
  key: string;
  title: string;
  desc: string;
  img: string;
  tags?: string[];
};

const siteTypes: SiteType[] = [
  {
    key: "saas",
    title: "SaaS Landing",
    desc: "High-converting landing pages with modern sections, pricing, FAQs, and integrations.",
    img: "/assets/types/saas.webp",
    tags: ["Conversion", "Speed", "SEO"],
  },
  {
    key: "ecommerce",
    title: "E-commerce Store",
    desc: "Product catalog, cart & checkout, Stripe/PayPal, analytics, and optimized PDPs.",
    img: "/assets/types/ecomm.webp",
    tags: ["Stripe", "Woo/Shopify", "A/B Testing"],
  },
  {
    key: "portfolio",
    title: "Portfolio / Personal",
    desc: "Crisp personal sites for creators, agencies, and freelancers with case studies.",
    img: "/assets/types/portfolio.webp",
    tags: ["Animations", "CMS", "Fast"],
  },
  {
    key: "corporate",
    title: "Corporate Website",
    desc: "Trust-driven company sites with careers, blog, legal pages, and multi-language.",
    img: "/assets/types/corporate.webp",
    tags: ["i18n", "Accessibility", "SEO"],
  },
  {
    key: "booking",
    title: "Booking / Marketplace",
    desc: "Listings, calendars, messaging, ratings, and secure payments for services.",
    img: "/assets/types/booking.webp",
    tags: ["Search", "Filters", "Payments"],
  },
  {
    key: "blog",
    title: "Blog / Content Hub",
    desc: "SEO-ready blog with categories, authors, MDX/CMS, and newsletter capture.",
    img: "/assets/types/blogs.webp",
    tags: ["MDX", "Headless CMS", "SEO"],
  },
  {
    key: "dashboard",
    title: "Web App Dashboard",
    desc: "Role-based dashboards, charts, real-time data, and secure auth.",
    img: "/assets/types/dashboard.webp",
    tags: ["Auth", "Charts", "Realtime"],
  },
];

onMounted(() => {
  // Respect reduced motion
  const prefersReduced = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;
  if (prefersReduced) {
    [revealRoot.value, revealImage.value].forEach((root) => {
      if (!root) return;
      root.classList.add("show");
      root.querySelectorAll<HTMLElement>("[data-animate]").forEach((el) => {
        el.style.opacity = "1";
        el.style.transform = "none";
        el.style.filter = "none";
      });
    });
    return;
  }

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          observer?.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  if (revealRoot.value) observer.observe(revealRoot.value);
  if (revealImage.value) observer.observe(revealImage.value);
});

onBeforeUnmount(() => {
  observer?.disconnect();
  observer = null;
});
</script>

<template>
  <section
    id="hero"
    class="relative isolate overflow-hidden bg-white dark:bg-neutral-950 text-white"
  >
    <!-- glow background (centered) -->
    <div
      class="pointer-events-none absolute inset-0 -z-10 opacity-60"
      style="
        background: radial-gradient(
            1200px 600px at 50% 50%,
            rgba(255, 255, 255, 0.15),
            transparent 70%
          ),
          radial-gradient(
            800px 400px at 80% 60%,
            rgba(80, 200, 255, 0.06),
            transparent 60%
          );
      "
    />

    <div
      class="mx-auto max-w-6xl px-6 pt-18 pb-10 sm:pt-28 sm:pb-16 reveal"
      ref="revealRoot"
    >
      <!-- Headline -->
      <h1
        data-animate="1"
        class="text-center text-4xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl mb-16"
      >
        Build. Launch. Grow.
      </h1>

      <!-- Subheadline -->
      <p
        data-animate="2"
        class="mx-auto mt-6 max-w-3xl text-center text-base text-neutral-300 sm:text-lg mb-10"
      >
        Aibrya is your digital agency partner — delivering modern websites,
        apps, and creative solutions to help your business stand out online.
      </p>

      <!-- CTAs -->
      <div
        data-animate="3"
        class="mt-8 flex items-center justify-center gap-3 sm:gap-4 mb-8"
      >
        <NuxtLink
          to="/signup"
          class="inline-flex items-center justify-center rounded-md bg-emerald-500 px-5 py-3 font-semibold text-black transition hover:bg-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-300"
        >
          Start Your Project
        </NuxtLink>

        <button
          to="/demo"
          class="inline-flex cursor-pointer items-center justify-center rounded-md bg-neutral-800 px-5 py-3 font-semibold text-white ring-1 ring-white/10 transition hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-white/20"
          @click="visible = true"
        >
          View Live Choices
        </button>
      </div>

      <!-- Avatars + rating -->
      <div
        data-animate="4"
        class="mt-6 flex items-center justify-center gap-5 mb-16"
      >
        <div>
          <img
            class="w-40 rounded-full ring-2 ring-neutral-900"
            src="/assets/clients.webp"
            alt="Clients"
          />
        </div>

        <div class="flex flex-col items-start gap-2 text-sm text-neutral-300">
          <div class="flex">
            <i class="pi pi-star-fill" style="font-size: 1rem; color: gold"></i>
            <i class="pi pi-star-fill" style="font-size: 1rem; color: gold"></i>
            <i class="pi pi-star-fill" style="font-size: 1rem; color: gold"></i>
            <i class="pi pi-star-fill" style="font-size: 1rem; color: gold"></i>
            <i class="pi pi-star-fill" style="font-size: 1rem; color: gold"></i>
          </div>
          <span>Trusted by startups and growing brands worldwide</span>
        </div>
      </div>
    </div>

    <!-- Dashboard preview card -->
    <div class="mx-auto -mt-2 mb-16 max-w-7xl px-6 reveal" ref="revealImage">
      <div
        data-animate="5"
        class="rounded-2xl bg-neutral-900/60 ring-1 ring-white/10 shadow-2xl overflow-hidden"
      >
        <img
          src="/assets/dashboard.webp"
          alt="Aibrya dashboard preview"
          class="w-full"
          loading="eager"
          decoding="async"
        />
        <div
          class="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
          style="
            background: linear-gradient(
              to bottom,
              rgba(0, 0, 0, 0) 0%,
              rgba(15, 15, 15, 1) 100%
            );
          "
        ></div>
      </div>
    </div>

    <Dialog
      v-model:visible="visible"
      modal
      :draggable="false"
      maximizable
      header="Website Types We Build"
      :style="{ width: '90rem' }"
    >
      <p class="text-surface-500 dark:text-surface-400 mb-4">
        Pick a style to explore examples. Each can be fully customized to your
        brand.
      </p>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div
          v-for="s in siteTypes"
          :key="s.key"
          class="flex gap-3 rounded-lg border border-white/10 bg-black/30 dark:bg-white/5 p-3 hover:border-emerald-400/40 transition"
        >
          <img
            :src="s.img"
            :alt="s.title"
            class="h-32 w-32 flex-none rounded-md object-cover ring-1 ring-white/10"
          />
          <div class="min-w-0">
            <h4 class="font-semibold text-white">{{ s.title }}</h4>
            <p class="text-sm text-white/70">
              {{ s.desc }}
            </p>
            <div class="mt-2 flex flex-wrap gap-1">
              <span
                v-for="t in s.tags"
                :key="t"
                class="text-xs rounded-md px-2 py-1 bg-emerald-500/10 text-emerald-300 ring-1 ring-emerald-500/30"
              >
                {{ t }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <template #footer>
        <div class="w-full flex justify-between">
          <Button label="Close" severity="secondary" @click="visible = false" />
          <Button
            label="Discuss Your Project"
            @click="visible = false"
            class="bg-emerald-500 border-none hover:bg-emerald-400 text-black font-semibold"
          />
        </div>
      </template>
    </Dialog>
  </section>
</template>

<style scoped>
/* Initial state for all animated items inside .reveal */
.reveal [data-animate] {
  opacity: 0;
  transform: translateY(16px) scale(0.985);
  filter: blur(6px);
  will-change: opacity, transform, filter;
}

/* When container gets .show, play the animation with stagger by data-animate index */
.reveal.show [data-animate] {
  animation: heroIn 800ms cubic-bezier(0.2, 0.65, 0.2, 1) forwards;
}

/* Stagger (100ms steps); increase if you want slower pacing */
.reveal.show [data-animate="1"] {
  animation-delay: 0ms;
}
.reveal.show [data-animate="2"] {
  animation-delay: 100ms;
}
.reveal.show [data-animate="3"] {
  animation-delay: 200ms;
}
.reveal.show [data-animate="4"] {
  animation-delay: 300ms;
}
.reveal.show [data-animate="5"] {
  animation-delay: 450ms;
}

@keyframes heroIn {
  0% {
    opacity: 0;
    transform: translateY(16px) scale(0.985);
    filter: blur(6px);
  }
  60% {
    opacity: 1;
    transform: translateY(0) scale(1);
    filter: blur(0.5px);
  }
  100% {
    opacity: 1;
    transform: none;
    filter: blur(0);
  }
}

/* Optional: subtle letterbox fade for extra cinematic feel */
#hero::before,
#hero::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  height: 96px;
  pointer-events: none;
  z-index: 1;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.35), transparent);
  opacity: 0;
  transition: opacity 0.8s ease;
}
#hero::after {
  top: auto;
  bottom: 0;
  transform: rotate(180deg);
}
.reveal.show ~ .reveal::before,
.reveal.show ~ .reveal::after,
.reveal.show::before,
.reveal.show::after {
  opacity: 0.6; /* lower if too strong */
}

/* Reduce motion fallback */
@media (prefers-reduced-motion: reduce) {
  .reveal [data-animate] {
    opacity: 1 !important;
    transform: none !important;
    filter: none !important;
    animation: none !important;
  }
  #hero::before,
  #hero::after {
    display: none;
  }
}
</style>
