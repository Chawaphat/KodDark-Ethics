<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <section class="relative overflow-hidden">
    <div
      class="absolute inset-0 -z-10 opacity-40"
      style="background: radial-gradient(60% 50% at 50% 0%, rgba(124,92,255,0.25), transparent 70%)"
    />
    <div class="max-w-4xl mx-auto px-5 pt-20 pb-16 text-center">
      <span class="inline-block text-[11px] uppercase tracking-widest text-judge-accent2 border border-judge-accent2/30 bg-judge-accent2/10 rounded-full px-3 py-1 mb-6">
        Interactive Ethics Simulation
      </span>
      <h1 class="text-4xl sm:text-5xl font-extrabold leading-tight tracking-tight">
        Dark Judge
      </h1>
      <p class="text-xl sm:text-2xl font-semibold text-slate-300 mt-2">Can You Spot the Trick?</p>
      <p class="mt-6 text-slate-400 leading-relaxed max-w-2xl mx-auto">
        Modern apps and websites are full of <span class="text-slate-200 font-medium">dark patterns</span> —
        manipulative designs built to exploit cognitive biases like loss aversion and scarcity bias.
        Step into realistic checkout pages, flash sales, and subscription flows, hunt down every
        manipulative trick, then prove you can redesign them ethically.
      </p>
      <div class="mt-9 flex items-center justify-center gap-3">
        <RouterLink
          to="/scenarios"
          class="rounded-full bg-judge-accent hover:bg-judge-accent/90 text-white font-semibold px-6 py-3 shadow-glow transition"
        >
          Start Investigating →
        </RouterLink>
        <RouterLink
          to="/dashboard"
          class="rounded-full border border-white/15 hover:bg-white/5 text-slate-200 font-semibold px-6 py-3 transition"
        >
          View Ethics Dashboard
        </RouterLink>
      </div>
    </div>

    <div class="max-w-5xl mx-auto px-5 pb-20 grid sm:grid-cols-3 gap-4">
      <div class="bg-judge-panel border border-white/10 rounded-2xl p-5">
        <p class="text-2xl mb-2">🕵️</p>
        <h3 class="font-semibold mb-1">1. Spot the Trick</h3>
        <p class="text-sm text-slate-400">Explore realistic mock web pages and click on every element designed to manipulate you.</p>
      </div>
      <div class="bg-judge-panel border border-white/10 rounded-2xl p-5">
        <p class="text-2xl mb-2">🧠</p>
        <h3 class="font-semibold mb-1">2. Learn the Psychology</h3>
        <p class="text-sm text-slate-400">Get instant feedback naming the pattern and the cognitive bias it exploits.</p>
      </div>
      <div class="bg-judge-panel border border-white/10 rounded-2xl p-5">
        <p class="text-2xl mb-2">⚖️</p>
        <h3 class="font-semibold mb-1">3. Redesign It Fairly</h3>
        <p class="text-sm text-slate-400">Choose the honest alternative and track your Transparency, Autonomy &amp; Fairness scores.</p>
      </div>
    </div>
  </section>
</template>
