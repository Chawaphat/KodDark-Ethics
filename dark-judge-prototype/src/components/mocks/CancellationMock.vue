<script setup>
import { ref } from 'vue'
import Hotspot from '../Hotspot.vue'

const props = defineProps({
  found: { type: Array, default: () => [] },
})
const emit = defineEmits(['found', 'trapped'])

const is = (id) => props.found.includes(id)
const screen = ref('settings') // settings -> account -> advanced -> confirm -> offer1 -> offer2 -> phone
const trappedMsg = ref('')

function goCancelLink() {
  emit('found', 'buried-cancel-link')
  screen.value = 'confirm'
}
function onKeepBenefits() {
  emit('found', 'confirmshame-button')
  screen.value = 'settings'
}
function onLoseAccess() {
  emit('found', 'confirmshame-button')
  screen.value = 'offer1'
}
// note: buttons above call emit('found', …) directly so detection works
// even though @click.stop prevents the click from bubbling to the wrapping Hotspot
function acceptOffer(which) {
  emit('found', 'retention-offer-trap')
  trappedMsg.value =
    which === 'discount'
      ? 'You accepted the 20% discount — your subscription is still active.'
      : 'You paused instead of canceling — you\'ll be billed again automatically.'
  emit('trapped')
}
function declineOffer1() {
  emit('found', 'retention-offer-trap')
  screen.value = 'offer2'
}
function declineOffer2() {
  emit('found', 'retention-offer-trap')
  screen.value = 'phone'
}
function reset() {
  screen.value = 'settings'
  trappedMsg.value = ''
}
</script>

<template>
  <div class="rounded-2xl overflow-hidden border border-white/10 bg-white text-slate-900 shadow-xl">
    <div class="bg-slate-900 text-white px-5 py-3 flex items-center justify-between">
      <span class="font-bold tracking-tight">StreamPlus <span class="text-judge-accent2">Premium</span></span>
      <button v-if="screen !== 'settings'" class="text-xs text-slate-300 underline" @click="reset">↺ start over</button>
    </div>

    <div class="p-5 sm:p-6 min-h-[280px]">
      <!-- settings menu -->
      <div v-if="screen === 'settings'" class="space-y-2">
        <p class="text-xs uppercase tracking-wide text-slate-400 mb-2">Settings</p>
        <div class="rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-500">Profile</div>
        <div class="rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-500">Notifications</div>
        <div class="rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-500">Billing History</div>
        <button class="w-full text-left rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold hover:border-judge-accent/50 transition" @click="screen = 'account'">
          Account →
        </button>
      </div>

      <!-- account menu -->
      <div v-else-if="screen === 'account'" class="space-y-2">
        <button class="text-xs text-slate-400 mb-2" @click="screen = 'settings'">← Settings</button>
        <p class="text-xs uppercase tracking-wide text-slate-400 mb-2">Account</p>
        <div class="rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-500">Profile Info</div>
        <div class="rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-500">Security</div>
        <button class="w-full text-left rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold hover:border-judge-accent/50 transition" @click="screen = 'advanced'">
          Advanced →
        </button>
      </div>

      <!-- advanced: buried cancel link -->
      <div v-else-if="screen === 'advanced'" class="space-y-2">
        <button class="text-xs text-slate-400 mb-2" @click="screen = 'account'">← Account</button>
        <p class="text-xs uppercase tracking-wide text-slate-400 mb-2">Advanced</p>
        <div class="rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-500">Export My Data</div>
        <div class="rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-500">Connected Devices</div>
        <Hotspot as="button" :found="is('buried-cancel-link')" @trigger="goCancelLink" class="w-full text-left block">
          <div class="rounded-xl border border-slate-200 px-4 py-3 text-xs text-slate-400">
            Manage subscription &amp; cancellation
          </div>
        </Hotspot>
      </div>

      <!-- confirm: confirmshaming -->
      <div v-else-if="screen === 'confirm'" class="space-y-4 text-center">
        <p class="text-2xl">😢</p>
        <p class="font-semibold">Are you sure you want to leave StreamPlus Premium?</p>
        <p class="text-sm text-slate-500">You'll lose access to 4K streaming, offline downloads, and 2 profiles.</p>
        <Hotspot as="div" :found="is('confirmshame-button')" @trigger="() => emit('found', 'confirmshame-button')" class="space-y-2 pt-2">
          <button class="w-full rounded-xl bg-judge-accent text-white font-bold py-3" @click.stop="onKeepBenefits">
            Yes, keep enjoying my benefits
          </button>
          <button class="w-full text-xs text-slate-400 underline py-1" @click.stop="onLoseAccess">
            No, I want to lose access to everything
          </button>
        </Hotspot>
      </div>

      <!-- offer 1 -->
      <div v-else-if="screen === 'offer1'" class="space-y-4 text-center">
        <p class="text-2xl">🎁</p>
        <Hotspot as="div" :found="is('retention-offer-trap')" @trigger="() => emit('found', 'retention-offer-trap')">
          <p class="font-semibold">Wait — here's 20% off for the next 3 months!</p>
        </Hotspot>
        <div class="space-y-2">
          <button class="w-full rounded-xl bg-emerald-500 text-white font-bold py-3" @click="acceptOffer('discount')">
            Yes, keep my subscription with 20% off
          </button>
          <button class="w-full text-xs text-slate-400 underline py-1" @click="declineOffer1">
            No thanks, continue canceling
          </button>
        </div>
      </div>

      <!-- offer 2 -->
      <div v-else-if="screen === 'offer2'" class="space-y-4 text-center">
        <p class="text-2xl">⏸️</p>
        <Hotspot as="div" :found="is('retention-offer-trap')" @trigger="() => emit('found', 'retention-offer-trap')">
          <p class="font-semibold">Not ready to say goodbye? Pause instead.</p>
        </Hotspot>
        <div class="space-y-2">
          <button class="w-full rounded-xl bg-amber-500 text-white font-bold py-3" @click="acceptOffer('pause')">
            Pause my subscription
          </button>
          <button class="w-full text-xs text-slate-400 underline py-1" @click="declineOffer2">
            No, I really want to cancel
          </button>
        </div>
      </div>

      <!-- phone only final step -->
      <div v-else-if="screen === 'phone'" class="space-y-3 text-center">
        <p class="text-2xl">📞</p>
        <Hotspot as="div" :found="is('phone-only-final-step')" @trigger="emit('found', 'phone-only-final-step')">
          <p class="font-semibold">To complete cancellation, please call our retention line.</p>
          <p class="text-sm text-slate-500 mt-1">1-800-555-0199 · Mon–Fri, 9am–5pm</p>
        </Hotspot>
        <button class="mt-2 text-xs text-slate-400 underline" @click="reset">↺ start over</button>
      </div>

      <div v-if="trappedMsg" class="mt-4 rounded-xl bg-rose-50 border border-rose-200 px-4 py-3 text-sm text-rose-600 text-center">
        😬 {{ trappedMsg }}
        <button class="block mx-auto mt-2 text-xs text-rose-500 underline" @click="reset">try again</button>
      </div>
    </div>
  </div>
</template>
