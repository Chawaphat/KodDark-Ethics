<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { scenarios, categoryMeta } from '../data/scenarios'
import { useEthicsStore } from '../store/ethics'
import ScoreBar from '../components/ScoreBar.vue'
import Icon from '../components/Icon.vue'

const store = useEthicsStore()

const overall = computed(() => store.overallScore)

function verdict(score) {
  if (score >= 85) return { label: 'Ethical Design Advocate', icon: 'trophy' }
  if (score >= 60) return { label: 'Sharp-Eyed Investigator', icon: 'search' }
  if (score >= 30) return { label: 'Still Getting Tricked', icon: 'meh' }
  return { label: 'Dark Pattern Rookie', icon: 'sprout' }
}
</script>

<template>
  <section class="max-w-5xl mx-auto px-5 py-12">
    <h1 class="text-2xl font-extrabold mb-1">Ethics Score Dashboard</h1>
    <p class="text-slate-400 mb-8">
      Tracks how well you detect manipulative UI and choose transparent, fair, autonomy-respecting redesigns.
    </p>

    <div class="grid md:grid-cols-3 gap-5 mb-8">
      <div class="md:col-span-1 bg-judge-panel border border-white/10 rounded-2xl p-6 flex flex-col items-center justify-center text-center">
        <p class="text-xs uppercase tracking-widest text-slate-400 mb-1">Overall Ethics Score</p>
        <p class="text-5xl font-extrabold">{{ overall }}</p>
        <p class="text-sm text-slate-400 mt-2 flex items-center justify-center gap-1.5">
          <Icon :name="verdict(overall).icon" :size="16" />
          <span>{{ verdict(overall).label }}</span>
        </p>
      </div>
      <div class="md:col-span-2 bg-judge-panel border border-white/10 rounded-2xl p-6 space-y-5 flex flex-col justify-center">
        <ScoreBar
          label="Transparency"
          :value="store.categoryScore('transparency')"
          :color="categoryMeta.transparency.color"
        />
        <ScoreBar
          label="User Autonomy"
          :value="store.categoryScore('autonomy')"
          :color="categoryMeta.autonomy.color"
        />
        <ScoreBar
          label="Fairness"
          :value="store.categoryScore('fairness')"
          :color="categoryMeta.fairness.color"
        />
      </div>
    </div>

    <div class="grid sm:grid-cols-3 gap-4 mb-10">
      <div class="bg-judge-panel border border-white/10 rounded-xl p-4 text-center">
        <p class="text-2xl font-bold">{{ store.totalFound }}/{{ store.totalHotspots }}</p>
        <p class="text-xs text-slate-400 mt-1">Dark patterns detected</p>
      </div>
      <div class="bg-judge-panel border border-white/10 rounded-xl p-4 text-center">
        <p class="text-2xl font-bold">{{ store.scenariosCompleted }}/{{ scenarios.length }}</p>
        <p class="text-xs text-slate-400 mt-1">Scenarios completed</p>
      </div>
      <div class="bg-judge-panel border border-white/10 rounded-xl p-4 text-center">
        <p class="text-2xl font-bold">
          {{ scenarios.filter(s => store.progress[s.id].redesignCorrect).length }}/{{ scenarios.length }}
        </p>
        <p class="text-xs text-slate-400 mt-1">Ethical redesigns chosen</p>
      </div>
    </div>

    <h2 class="text-lg font-bold mb-4">Scenario Breakdown</h2>
    <div class="space-y-3">
      <RouterLink
        v-for="s in scenarios"
        :key="s.id"
        :to="`/scenario/${s.id}`"
        class="press flex items-center justify-between gap-4 bg-judge-panel border border-white/10 rounded-xl p-4"
      >
        <div>
          <p class="font-semibold">{{ s.title }}</p>
          <p class="text-xs text-slate-500">{{ s.tag }}</p>
        </div>
        <div class="text-right shrink-0">
          <p class="text-sm font-semibold">{{ store.scenarioFoundCount(s.id) }}/{{ s.totalHotspots }} found</p>
          <p
            class="text-xs flex items-center justify-end gap-1"
            :class="store.progress[s.id].completed ? 'text-judge-accent2' : 'text-slate-500'"
          >
            <Icon v-if="store.progress[s.id].completed" name="check-square" :size="12" />
            <span>{{ store.progress[s.id].completed ? 'Completed' : 'In progress' }}</span>
          </p>
        </div>
      </RouterLink>
    </div>

    <div v-if="store.totalFound === 0" class="mt-8 text-center text-sm text-slate-500">
      No data yet — <RouterLink to="/scenarios" class="text-judge-accent underline">play a scenario</RouterLink> to populate your dashboard.
    </div>
  </section>
</template>
