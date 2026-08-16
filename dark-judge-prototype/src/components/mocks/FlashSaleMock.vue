<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import Hotspot from '../Hotspot.vue'
import Icon from '../Icon.vue'

const props = defineProps({
  found: { type: Array, default: () => [] },
})
const emit = defineEmits(['found', 'trapped'])

const is = (id) => props.found.includes(id)

// countdown that "resets" every time it hits 0 — fake urgency
const totalSeconds = ref(4 * 60 + 59)
let timer = null

function tick() {
  totalSeconds.value -= 1
  if (totalSeconds.value <= 0) totalSeconds.value = 4 * 60 + 59
}

onMounted(() => {
  timer = setInterval(tick, 1000)
})
onUnmounted(() => clearInterval(timer))

function fmt(s) {
  const m = Math.floor(s / 60)
  const sec = s % 60
  return `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`
}

const claimed = ref(false)
function claimDeal() {
  claimed.value = true
  emit('trapped')
}
</script>

<template>
  <div class="rounded-2xl overflow-hidden border border-white/10 bg-white text-slate-900 shadow-xl">
    <div class="bg-rose-600 text-white px-5 py-3 flex items-center justify-between">
      <span class="font-bold tracking-tight">SoundWave Audio</span>
      <span class="text-xs bg-white/20 rounded-full px-2 py-0.5 flex items-center gap-1">
        <Icon name="bolt" :size="12" />Flash Sale
      </span>
    </div>

    <div class="p-5 sm:p-6 space-y-5">
      <div class="flex gap-4 items-center">
        <div class="w-16 h-16 rounded-xl bg-slate-200 flex items-center justify-center text-slate-600">
          <Icon name="headphones" :size="28" />
        </div>
        <div class="flex-1">
          <p class="font-semibold">Pulse Pro Wireless Earbuds</p>
          <p class="text-sm">
            <span class="text-rose-600 font-bold">$39.99</span>
            <span class="text-slate-400 line-through ml-1">$89.99</span>
          </p>
        </div>
      </div>

      <!-- fake countdown -->
      <Hotspot as="div" :found="is('fake-countdown')" @trigger="emit('found', 'fake-countdown')">
        <div class="rounded-xl bg-rose-50 border border-rose-200 px-4 py-3 text-center">
          <p class="text-[11px] uppercase tracking-wide text-rose-500 font-semibold mb-0.5">Deal ends in</p>
          <p class="text-2xl font-mono font-extrabold text-rose-600">{{ fmt(totalSeconds) }}</p>
        </div>
      </Hotspot>

      <div class="grid grid-cols-2 gap-3">
        <!-- fake stock counter -->
        <Hotspot as="div" :found="is('fake-stock-counter')" @trigger="emit('found', 'fake-stock-counter')">
          <div class="rounded-xl border border-amber-200 bg-amber-50 px-3 py-2.5 text-center">
            <p class="text-xs text-amber-700 font-semibold flex items-center justify-center gap-1">
              <Icon name="flame" :size="14" />Only 2 left in stock!
            </p>
          </div>
        </Hotspot>

        <!-- fake social proof -->
        <Hotspot as="div" :found="is('fake-social-proof')" @trigger="emit('found', 'fake-social-proof')">
          <div class="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-center">
            <p class="text-xs text-slate-600 font-semibold flex items-center justify-center gap-1">
              <Icon name="eye" :size="14" />14 people viewing this
            </p>
          </div>
        </Hotspot>
      </div>

      <div class="flex flex-col items-center gap-2 pt-1">
        <button
          v-if="!claimed"
          class="press w-full rounded-xl bg-rose-600 text-white font-bold py-3"
          @click="claimDeal"
        >
          Claim This Deal Now
        </button>
        <div v-else class="w-full rounded-xl bg-slate-100 text-slate-500 text-sm text-center py-3 flex items-center justify-center gap-2 animate-slide-down">
          <Icon name="grimace" :size="16" class="animate-pop-in" />
          <span>You clicked "Claim Deal" — but the timer never really runs out.</span>
        </div>

        <Hotspot as="span" :found="is('tiny-no-thanks')" @trigger="emit('found', 'tiny-no-thanks')">
          <span class="text-[10px] text-slate-400 underline cursor-pointer">
            No, I prefer to pay full price later
          </span>
        </Hotspot>
      </div>
    </div>
  </div>
</template>
