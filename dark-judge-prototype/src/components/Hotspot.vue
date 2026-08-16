<script setup>
defineProps({
  found: { type: Boolean, default: false },
  as: { type: String, default: 'div' },
})
const emit = defineEmits(['trigger'])
</script>

<template>
  <component
    :is="as"
    class="hotspot"
    :class="found ? 'hotspot-found' : ''"
    @click="emit('trigger')"
  >
    <slot />
  </component>
</template>
