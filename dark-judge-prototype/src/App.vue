<script setup>
import NavBar from './components/NavBar.vue'
</script>

<template>
  <div class="min-h-full flex flex-col">
    <NavBar />
    <main class="flex-1">
      <RouterView />
    </main>
    <footer class="border-t border-white/5 py-6 mt-10">
      <div class="max-w-6xl mx-auto px-5 text-xs text-slate-500 flex flex-wrap gap-x-4 gap-y-1">
        <span>Dark Judge — Can You Spot the Trick?</span>
        <span>Ethics and Professionalism for Software Engineers (953420)</span>
        <span>Prototype build — {{ new Date().getFullYear() }}</span>
      </div>
    </footer>
  </div>
</template>
