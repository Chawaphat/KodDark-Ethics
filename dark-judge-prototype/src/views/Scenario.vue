<script setup>
import { ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { getScenario } from '../data/scenarios'
import { useEthicsStore } from '../store/ethics'
import FeedbackModal from '../components/FeedbackModal.vue'
import RedesignChallenge from '../components/RedesignChallenge.vue'
import CheckoutMock from '../components/mocks/CheckoutMock.vue'
import FlashSaleMock from '../components/mocks/FlashSaleMock.vue'
import CancellationMock from '../components/mocks/CancellationMock.vue'
import Icon from '../components/Icon.vue'

const props = defineProps({ id: String })
const router = useRouter()
const store = useEthicsStore()

const scenario = computed(() => getScenario(props.id))
const started = ref(false)
const activeHotspot = ref(null)
const trapToast = ref(false)

const mockComponents = {
  CheckoutMock,
  FlashSaleMock,
  CancellationMock,
}

watch(
  () => props.id,
  () => {
    started.value = false
    activeHotspot.value = null
  }
)

const found = computed(() => store.progress[props.id]?.found ?? [])
const allFound = computed(() => scenario.value && found.value.length >= scenario.value.totalHotspots)
const isCompleted = computed(() => store.progress[props.id]?.completed)

const nextHint = computed(() => {
  if (!scenario.value) return null
  const remaining = Object.entries(scenario.value.hotspots).find(([hid]) => !found.value.includes(hid))
  return remaining ? remaining[1].hint : null
})

function onFound(hotspotId) {
  const already = found.value.includes(hotspotId)
  store.recordHotspot(props.id, hotspotId)
  if (!already) {
    activeHotspot.value = { id: hotspotId, ...scenario.value.hotspots[hotspotId] }
  }
}

function onTrapped() {
  store.recordTrapped(props.id)
  trapToast.value = true
  setTimeout(() => (trapToast.value = false), 3500)
}

function onRedesignChoice(option) {
  store.recordRedesign(props.id, option.id, option.isEthical)
}

function resetScenario() {
  store.resetScenario(props.id)
  started.value = true
  activeHotspot.value = null
}
</script>

<template>
  <section v-if="scenario" class="max-w-5xl mx-auto px-5 py-10">
    <button class="text-sm text-slate-400 mb-5" @click="router.push('/scenarios')">
      ← All scenarios
    </button>

    <div v-if="!started" class="max-w-xl mx-auto text-center bg-judge-panel border border-white/10 rounded-2xl p-8">
      <span class="text-[11px] uppercase tracking-widest text-slate-500">{{ scenario.tag }}</span>
      <h1 class="text-2xl font-extrabold mt-1 mb-4">{{ scenario.title }}</h1>
      <p class="text-slate-300 leading-relaxed mb-6">{{ scenario.briefing }}</p>
      <p class="text-xs text-slate-500 mb-6">
        Find all <span class="text-slate-300 font-semibold">{{ scenario.totalHotspots }}</span> dark patterns hidden in the page below.
      </p>
      <button
        class="press rounded-full bg-judge-accent text-white font-semibold px-6 py-3"
        @click="started = true"
      >
        Begin Investigation →
      </button>
    </div>

    <div v-else class="grid lg:grid-cols-[1fr_320px] gap-8 items-start">
      <div>
        <component
          :is="mockComponents[scenario.component]"
          :found="found"
          @found="onFound"
          @trapped="onTrapped"
        />
      </div>

      <aside class="lg:sticky lg:top-20 space-y-4">
        <div class="bg-judge-panel border border-white/10 rounded-2xl p-5">
          <p class="text-xs uppercase tracking-wide text-slate-500 mb-2">Tricks Found</p>
          <p class="text-3xl font-extrabold mb-3">{{ found.length }}<span class="text-slate-500 text-lg">/{{ scenario.totalHotspots }}</span></p>
          <div class="h-2 rounded-full bg-white/5 overflow-hidden mb-4">
            <div class="h-full bg-judge-accent2 rounded-full transition-all duration-700 ease-out" :style="{ width: (found.length / scenario.totalHotspots) * 100 + '%' }" />
          </div>
          <ul class="space-y-1.5 text-sm">
            <li
              v-for="[hid, h] in Object.entries(scenario.hotspots)"
              :key="hid"
              class="flex items-center gap-2"
              :class="found.includes(hid) ? 'text-slate-200' : 'text-slate-600'"
            >
              <span
                :key="found.includes(hid)"
                :class="[found.includes(hid) ? 'text-judge-accent2' : 'text-slate-700', found.includes(hid) ? 'animate-pop-in' : '']"
              >
                <Icon :name="found.includes(hid) ? 'check-square' : 'square'" :size="16" />
              </span>
              <span>{{ found.includes(hid) ? h.patternName : '???' }}</span>
            </li>
          </ul>
          <button class="press mt-4 text-xs text-slate-500 underline" @click="resetScenario">
            ↺ Reset scenario
          </button>
        </div>

        <!-- Hint: the one deliberate hover affordance in this app -->
        <div v-if="nextHint" class="group relative">
          <button class="press w-full flex items-center justify-center gap-2 rounded-xl border border-white/15 text-slate-300 hover:text-white hover:border-judge-accent hover:bg-judge-accent text-sm font-semibold py-2.5 transition-colors">
            <Icon name="lightbulb" :size="16" />
            <span>Hint</span>
          </button>
          <div class="absolute left-0 right-0 top-full mt-2 z-10 opacity-0 translate-y-1 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-150 bg-judge-panel2 border border-white/10 rounded-xl p-3 text-xs text-slate-300 leading-relaxed">
            {{ nextHint }}
          </div>
        </div>

        <transition name="toast">
          <div v-if="trapToast" class="bg-judge-warn/15 border border-judge-warn/40 text-judge-warn text-sm rounded-xl px-4 py-3 flex items-center gap-2">
            <Icon name="grimace" :size="18" class="shrink-0 animate-pop-in" />
            <span>You got caught by the manipulation — that's exactly the point. Keep exploring.</span>
          </div>
        </transition>
      </aside>
    </div>

    <div v-if="started && allFound" class="max-w-xl mx-auto mt-10">
      <RedesignChallenge
        v-if="!isCompleted"
        :redesign="scenario.redesign"
        @choose="onRedesignChoice"
      />
      <div v-else class="bg-judge-panel border border-judge-accent2/40 rounded-2xl p-6 text-center animate-scale-in">
        <p class="mb-2 text-judge-accent2 flex justify-center"><Icon name="party" :size="30" class="animate-bounce-in" /></p>
        <p class="font-semibold mb-1">Scenario complete!</p>
        <p class="text-sm text-slate-400 mb-5">You found every dark pattern and chose a redesign.</p>
        <div class="flex items-center justify-center gap-3">
          <button class="press rounded-full border border-white/15 px-5 py-2.5 text-sm font-semibold" @click="router.push('/scenarios')">
            More scenarios
          </button>
          <button class="press rounded-full bg-judge-accent px-5 py-2.5 text-sm font-semibold" @click="router.push('/dashboard')">
            View Ethics Dashboard
          </button>
        </div>
      </div>
    </div>

    <FeedbackModal :hotspot="activeHotspot" @close="activeHotspot = null" />
  </section>

  <section v-else class="max-w-xl mx-auto px-5 py-20 text-center text-slate-400">
    Scenario not found.
  </section>
</template>

<style scoped>
.toast-enter-active {
  transition: opacity 0.25s ease, transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}
.toast-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.toast-enter-from {
  opacity: 0;
  transform: translateY(-8px) scale(0.98);
}
.toast-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>
