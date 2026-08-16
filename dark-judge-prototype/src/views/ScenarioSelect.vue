<script setup>
import { RouterLink } from 'vue-router'
import { scenarios } from '../data/scenarios'
import { useEthicsStore } from '../store/ethics'
import Icon from '../components/Icon.vue'

const store = useEthicsStore()

const difficultyColor = {
  Easy: 'text-judge-accent2',
  Medium: 'text-judge-gold',
  Hard: 'text-judge-warn',
}
</script>

<template>
  <section class="max-w-5xl mx-auto px-5 py-12">
    <h1 class="text-2xl font-extrabold mb-1">Choose a Scenario</h1>
    <p class="text-slate-400 mb-8">Each scenario is a mock digital service. Find every dark pattern, then redesign it.</p>

    <div class="grid sm:grid-cols-3 gap-5">
      <RouterLink
        v-for="(s, i) in scenarios"
        :key="s.id"
        :to="`/scenario/${s.id}`"
        class="press bg-judge-panel border border-white/10 rounded-2xl p-5 flex flex-col animate-slide-down"
        :style="{ animationDelay: i * 70 + 'ms' }"
      >
        <div class="flex items-center justify-between mb-3">
          <span class="text-[11px] uppercase tracking-wide text-slate-500">{{ s.tag }}</span>
          <span class="text-[11px] font-semibold" :class="difficultyColor[s.difficulty]">{{ s.difficulty }}</span>
        </div>
        <h2 class="font-bold text-lg leading-snug mb-2">{{ s.title }}</h2>
        <p class="text-sm text-slate-400 flex-1">{{ s.teaser }}</p>

        <div class="mt-4">
          <div class="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span>{{ store.scenarioFoundCount(s.id) }}/{{ s.totalHotspots }} tricks found</span>
            <span v-if="store.progress[s.id].completed" class="text-judge-accent2 font-semibold flex items-center gap-1">
              <Icon name="check-square" :size="12" />Done
            </span>
          </div>
          <div class="h-1.5 rounded-full bg-white/5 overflow-hidden">
            <div
              class="h-full bg-judge-accent rounded-full transition-all duration-700 ease-out"
              :style="{ width: (store.scenarioFoundCount(s.id) / s.totalHotspots) * 100 + '%' }"
            />
          </div>
        </div>
      </RouterLink>
    </div>
  </section>
</template>
