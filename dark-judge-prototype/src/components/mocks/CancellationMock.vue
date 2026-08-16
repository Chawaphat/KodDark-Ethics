<script setup>
import { ref } from 'vue'
import Hotspot from '../Hotspot.vue'
import Icon from '../Icon.vue'

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
      <button v-if="screen !== 'settings'" class="press text-xs text-slate-300 underline" @click="reset">↺ start over</button>
    </div>

    <div class="p-5 sm:p-6 min-h-[280px]">
      <Transition name="screen" mode="out-in">
      <!-- settings menu -->
      <div v-if="screen === 'settings'" key="settings" class="space-y-2">
        <p class="text-xs uppercase tracking-wide text-slate-400 mb-2">Settings</p>
        <div class="rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-500">Profile</div>
        <div class="rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-500">Notifications</div>
        <div class="rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-500">Billing History</div>
        <button class="press w-full text-left rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold" @click="screen = 'account'">
          Account →
        </button>
      </div>

      <!-- account menu -->
      <div v-else-if="screen === 'account'" key="account" class="space-y-2">
        <button class="press text-xs text-slate-400 mb-2" @click="screen = 'settings'">← Settings</button>
        <p class="text-xs uppercase tracking-wide text-slate-400 mb-2">Account</p>
        <div class="rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-500">Profile Info</div>
        <div class="rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-500">Security</div>
        <button class="press w-full text-left rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold" @click="screen = 'advanced'">
          Advanced →
        </button>
      </div>

      <!-- advanced: buried cancel link -->
      <div v-else-if="screen === 'advanced'" key="advanced" class="space-y-2">
        <button class="press text-xs text-slate-400 mb-2" @click="screen = 'account'">← Account</button>
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
      <div v-else-if="screen === 'confirm'" key="confirm" class="space-y-4 text-center">
        <p class="text-rose-500 flex justify-center"><Icon name="frown" :size="30" class="animate-bounce-in" /></p>
        <p class="font-semibold">Are you sure you want to leave StreamPlus Premium?</p>
        <p class="text-sm text-slate-500">You'll lose access to 4K streaming, offline downloads, and 2 profiles.</p>
        <Hotspot as="div" :found="is('confirmshame-button')" @trigger="() => emit('found', 'confirmshame-button')" class="space-y-2 pt-2">
          <button class="press w-full rounded-xl bg-judge-accent text-white font-bold py-3" @click.stop="onKeepBenefits">
            Yes, keep enjoying my benefits
          </button>
          <button class="press w-full text-xs text-slate-400 underline py-1" @click.stop="onLoseAccess">
            No, I want to lose access to everything
          </button>
        </Hotspot>
      </div>

      <!-- offer 1 -->
      <div v-else-if="screen === 'offer1'" key="offer1" class="space-y-4 text-center">
        <p class="text-emerald-500 flex justify-center"><Icon name="gift" :size="30" class="animate-bounce-in" /></p>
        <Hotspot as="div" :found="is('retention-offer-trap')" @trigger="() => emit('found', 'retention-offer-trap')">
          <p class="font-semibold">Wait — here's 20% off for the next 3 months!</p>
        </Hotspot>
        <div class="space-y-2">
          <button class="press w-full rounded-xl bg-emerald-500 text-white font-bold py-3" @click="acceptOffer('discount')">
            Yes, keep my subscription with 20% off
          </button>
          <button class="press w-full text-xs text-slate-400 underline py-1" @click="declineOffer1">
            No thanks, continue canceling
          </button>
        </div>
      </div>

      <!-- offer 2 -->
      <div v-else-if="screen === 'offer2'" key="offer2" class="space-y-4 text-center">
        <p class="text-amber-500 flex justify-center"><Icon name="pause" :size="30" class="animate-bounce-in" /></p>
        <Hotspot as="div" :found="is('retention-offer-trap')" @trigger="() => emit('found', 'retention-offer-trap')">
          <p class="font-semibold">Not ready to say goodbye? Pause instead.</p>
        </Hotspot>
        <div class="space-y-2">
          <button class="press w-full rounded-xl bg-amber-500 text-white font-bold py-3" @click="acceptOffer('pause')">
            Pause my subscription
          </button>
          <button class="press w-full text-xs text-slate-400 underline py-1" @click="declineOffer2">
            No, I really want to cancel
          </button>
        </div>
      </div>

      <!-- phone only final step -->
      <div v-else-if="screen === 'phone'" key="phone" class="space-y-3 text-center">
        <p class="text-slate-500 flex justify-center"><Icon name="phone" :size="28" class="animate-bounce-in" /></p>
        <Hotspot as="div" :found="is('phone-only-final-step')" @trigger="emit('found', 'phone-only-final-step')">
          <p class="font-semibold">To complete cancellation, please call our retention line.</p>
          <p class="text-sm text-slate-500 mt-1">1-800-555-0199 · Mon–Fri, 9am–5pm</p>
        </Hotspot>
        <button class="press mt-2 text-xs text-slate-400 underline" @click="reset">↺ start over</button>
      </div>
      </Transition>

      <transition name="toast-local">
        <div v-if="trappedMsg" class="mt-4 rounded-xl bg-rose-50 border border-rose-200 px-4 py-3 text-sm text-rose-600 text-center">
          <span class="inline-flex items-center gap-1.5">
            <Icon name="grimace" :size="16" class="animate-pop-in" />
            <span>{{ trappedMsg }}</span>
          </span>
          <button class="press block mx-auto mt-2 text-xs text-rose-500 underline" @click="reset">try again</button>
        </div>
      </transition>
    </div>
  </div>
</template>

<style scoped>
.screen-enter-active {
  transition: opacity 0.2s ease, transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}
.screen-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}
.screen-enter-from {
  opacity: 0;
  transform: translateX(10px);
}
.screen-leave-to {
  opacity: 0;
  transform: translateX(-10px);
}

.toast-local-enter-active {
  transition: opacity 0.25s ease, transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}
.toast-local-enter-from {
  opacity: 0;
  transform: translateY(-6px);
}
</style>
