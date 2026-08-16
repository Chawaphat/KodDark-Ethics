<script setup>
import { ref } from 'vue'
import Icon from './Icon.vue'

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
        class="press w-full text-left rounded-xl border p-4 transition-colors duration-300"
        :class="[
          chosenId
            ? opt.isEthical
              ? 'border-judge-accent2/60 bg-judge-accent2/10'
              : opt.id === chosenId
                ? 'border-judge-warn/60 bg-judge-warn/10'
                : 'border-white/10 opacity-50'
            : 'border-white/10',
        ]"
        :disabled="!!chosenId"
        @click="choose(opt)"
      >
        <div class="flex items-start gap-3">
          <span
            v-if="chosenId && (opt.isEthical || opt.id === chosenId)"
            class="mt-0.5 animate-pop-in"
            :class="opt.isEthical ? 'text-judge-accent2' : 'text-judge-warn'"
          >
            <Icon :name="opt.isEthical ? 'check-square' : 'warning'" :size="18" />
          </span>
          <p class="text-sm text-slate-200">{{ opt.label }}</p>
        </div>
        <p v-if="chosenId && (opt.id === chosenId || opt.isEthical)" class="text-xs text-slate-400 mt-2 pl-7 animate-slide-down">
          {{ opt.feedback }}
        </p>
      </button>
    </div>
  </div>
</template>
