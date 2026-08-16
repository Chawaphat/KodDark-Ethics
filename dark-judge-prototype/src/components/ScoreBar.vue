<script setup>
defineProps({
  label: String,
  value: Number,
  color: { type: String, default: '#7c5cff' },
})
</script>

<template>
  <div>
    <div class="flex items-center justify-between text-sm mb-1">
      <span class="text-slate-300 font-medium">{{ label }}</span>
      <span class="text-slate-200 font-semibold">{{ value }}<span class="text-slate-500">/100</span></span>
    </div>
    <div class="h-2.5 w-full rounded-full bg-white/5 overflow-hidden">
      <div
        class="h-full rounded-full transition-all duration-500"
        :style="{ width: value + '%', backgroundColor: color }"
      />
    </div>
  </div>
</template>
