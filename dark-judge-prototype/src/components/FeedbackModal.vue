<script setup>
import { categoryMeta } from '../data/scenarios'
import Icon from './Icon.vue'

const props = defineProps({
  hotspot: { type: Object, default: null },
})
const emit = defineEmits(['close'])
</script>

<template>
  <Teleport to="body">
    <div
      v-if="hotspot"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 animate-fade-in"
      @click.self="emit('close')"
    >
      <div class="max-w-md w-full bg-judge-panel border border-white/10 rounded-2xl shadow-2xl p-6 animate-scale-in">
        <div class="flex items-start justify-between gap-3 mb-3">
          <div class="flex items-center gap-2">
            <span class="text-judge-accent2 animate-pop-in"><Icon name="search" :size="24" /></span>
            <div>
              <p class="text-xs uppercase tracking-wide text-judge-accent2 font-semibold">Trick Spotted</p>
              <h3 class="text-lg font-bold leading-tight">{{ hotspot.patternName }}</h3>
            </div>
          </div>
          <span
            class="text-[11px] font-semibold px-2 py-1 rounded-full whitespace-nowrap"
            :style="{ color: categoryMeta[hotspot.category].color, backgroundColor: categoryMeta[hotspot.category].color + '22' }"
          >
            {{ categoryMeta[hotspot.category].label }}
          </span>
        </div>
        <p class="text-sm text-slate-300 leading-relaxed">{{ hotspot.explanation }}</p>
        <button
          class="press mt-5 w-full rounded-xl bg-judge-accent text-white font-semibold py-2.5"
          @click="emit('close')"
        >
          Got it
        </button>
      </div>
    </div>
  </Teleport>
</template>
