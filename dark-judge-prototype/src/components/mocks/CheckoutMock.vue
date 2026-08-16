<script setup>
import { ref, computed } from 'vue'
import Hotspot from '../Hotspot.vue'
import Icon from '../Icon.vue'

const props = defineProps({
  found: { type: Array, default: () => [] },
})
const emit = defineEmits(['found'])

const step = ref(1)
const is = (id) => props.found.includes(id)

const base = 89.99
const addon = 6.99
const expressHandling = 4.99
const processingFee = 7.49

const total = computed(() => {
  let t = base + addon
  if (step.value === 2) t += expressHandling + processingFee
  return t.toFixed(2)
})
</script>

<template>
  <div class="rounded-2xl overflow-hidden border border-white/10 bg-white text-slate-900 shadow-xl">
    <!-- fake storefront header -->
    <div class="bg-slate-900 text-white px-5 py-3 flex items-center justify-between">
      <span class="font-bold tracking-tight">NOVA<span class="text-judge-accent2">KICKS</span></span>
      <span class="text-xs text-slate-300 flex items-center gap-1">
        <Icon name="lock" :size="12" />Secure Checkout
      </span>
    </div>

    <div class="p-5 sm:p-6 space-y-5">
      <!-- product -->
      <div class="flex gap-4 items-center">
        <div class="w-16 h-16 rounded-xl bg-slate-200 flex items-center justify-center text-slate-600">
          <Icon name="shoe" :size="28" />
        </div>
        <div class="flex-1">
          <p class="font-semibold">AeroRun Sneakers — Limited Edition</p>
          <p class="text-sm text-slate-500">Size 9 · Midnight Blue</p>
        </div>
        <p class="font-bold">${{ base.toFixed(2) }}</p>
      </div>

      <!-- fake free shipping banner -->
      <Hotspot as="div" :found="is('fake-free-shipping')" @trigger="emit('found', 'fake-free-shipping')">
        <div class="rounded-xl bg-emerald-50 border border-emerald-200 px-4 py-2.5 flex items-center gap-2">
          <span class="text-emerald-600"><Icon name="truck" :size="18" /></span>
          <p class="text-sm font-semibold text-emerald-700">FREE SHIPPING on this order!</p>
        </div>
      </Hotspot>

      <!-- pre-checked addon -->
      <Hotspot as="label" :found="is('preselected-addon')" @trigger="emit('found', 'preselected-addon')">
        <div class="flex items-center gap-3 rounded-xl border border-slate-200 px-4 py-3 cursor-pointer">
          <input type="checkbox" checked class="w-4 h-4 accent-judge-accent pointer-events-none" />
          <div class="flex-1">
            <p class="text-sm font-semibold">Priority Protection Plan</p>
            <p class="text-xs text-slate-500">Covers loss, damage &amp; late delivery</p>
          </div>
          <p class="text-sm font-semibold">+${{ addon.toFixed(2) }}</p>
        </div>
      </Hotspot>

      <!-- step 1: continue button -->
      <button
        v-if="step === 1"
        class="press w-full rounded-xl bg-slate-900 text-white font-semibold py-3"
        @click="step = 2"
      >
        Continue to Payment →
      </button>

      <!-- step 2: fees revealed -->
      <template v-else>
        <div class="rounded-xl border border-slate-200 divide-y animate-slide-down">
          <div class="flex justify-between px-4 py-2 text-sm text-slate-600">
            <span>Subtotal</span><span>${{ (base + addon).toFixed(2) }}</span>
          </div>
          <div class="flex justify-between px-4 py-2 text-sm text-slate-600">
            <span>Express handling</span><span>${{ expressHandling.toFixed(2) }}</span>
          </div>
          <Hotspot as="div" :found="is('hidden-fee-reveal')" @trigger="emit('found', 'hidden-fee-reveal')">
            <div class="flex justify-between px-4 py-2 text-[13px] text-slate-500">
              <span>Processing &amp; handling fee</span><span>${{ processingFee.toFixed(2) }}</span>
            </div>
          </Hotspot>
          <div class="flex justify-between px-4 py-2.5 text-sm font-bold">
            <span>Total</span><span>${{ total }}</span>
          </div>
        </div>

        <div class="flex flex-col items-center gap-2 pt-1">
          <button class="press w-full rounded-xl bg-judge-accent text-white font-bold py-3">
            Pay ${{ total }} Now
          </button>
          <Hotspot as="span" :found="is('tiny-decline-link')" @trigger="emit('found', 'tiny-decline-link')">
            <span class="text-[10px] text-slate-400 underline cursor-pointer">
              No thanks, I'll pay full price later
            </span>
          </Hotspot>
        </div>
      </template>
    </div>
  </div>
</template>
