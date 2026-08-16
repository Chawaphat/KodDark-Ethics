<script setup>
import { ref } from 'vue'

const props = defineProps({
  redesign: { type: Object, required: true },
})
const emit = defineEmits(['choose'])

const chosenId = ref(null)

function choose(option) {
  if (chosenId.value) return
  chosenId.value = option.id
  emit('choose', option)
}
</script>

<template>
  <div class="bg-judge-panel border border-white/10 rounded-2xl p-6">
    <p class="text-xs uppercase tracking-wide text-judge-gold font-semibold mb-2">Ethical Redesign Challenge</p>
    <h3 class="text-lg font-bold mb-4">{{ redesign.prompt }}</h3>

    <div class="space-y-3">
      <button
        v-for="opt in redesign.options"
        :key="opt.id"
        class="w-full text-left rounded-xl border p-4 transition"
        :class="[
          chosenId
            ? opt.isEthical
              ? 'border-judge-accent2/60 bg-judge-accent2/10'
              : opt.id === chosenId
                ? 'border-judge-warn/60 bg-judge-warn/10'
                : 'border-white/10 opacity-50'
            : 'border-white/10 hover:border-judge-accent/60 hover:bg-white/5',
        ]"
        :disabled="!!chosenId"
        @click="choose(opt)"
      >
        <div class="flex items-start gap-3">
          <span v-if="chosenId" class="text-lg leading-none mt-0.5">
            {{ opt.isEthical ? '✅' : (opt.id === chosenId ? '⚠️' : '') }}
          </span>
          <p class="text-sm text-slate-200">{{ opt.label }}</p>
        </div>
        <p v-if="chosenId && (opt.id === chosenId || opt.isEthical)" class="text-xs text-slate-400 mt-2 pl-7">
          {{ opt.feedback }}
        </p>
      </button>
    </div>
  </div>
</template>
