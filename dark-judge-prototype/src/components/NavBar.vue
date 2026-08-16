<script setup>
import { RouterLink } from 'vue-router'
import Icon from './Icon.vue'
</script>

<template>
  <header class="sticky top-0 z-40 border-b border-white/5 bg-judge-bg/90 backdrop-blur">
    <div class="max-w-6xl mx-auto px-5 py-3 flex items-center justify-between">
      <RouterLink to="/" class="flex items-center gap-2">
        <span class="text-judge-accent"><Icon name="scale" :size="20" /></span>
        <span class="font-extrabold tracking-tight text-lg">
          Dark <span class="text-judge-accent">Judge</span>
        </span>
        <span class="hidden sm:inline text-[11px] uppercase tracking-widest text-slate-500 ml-2 border border-white/10 rounded-full px-2 py-0.5">
          Prototype
        </span>
      </RouterLink>
      <nav class="flex items-center gap-1 text-sm">
        <RouterLink
          to="/scenarios"
          class="px-3 py-1.5 rounded-full text-slate-300"
          active-class="!text-white bg-white/10"
        >
          Scenarios
        </RouterLink>
        <RouterLink
          to="/dashboard"
          class="px-3 py-1.5 rounded-full text-slate-300"
          active-class="!text-white bg-white/10"
        >
          Ethics Dashboard
        </RouterLink>
      </nav>
    </div>
  </header>
</template>
