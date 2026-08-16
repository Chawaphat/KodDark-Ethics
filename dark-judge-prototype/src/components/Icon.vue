<script setup>
// Shared line-icon set (24x24, stroke-based, currentColor) used in place of emoji
// throughout the app. Keeps a single source of truth for iconography.
defineProps({
  name: { type: String, required: true },
  size: { type: [Number, String], default: 20 },
})

const icons = {
  search: '<circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/>',
  brain: '<path d="M9 4.5a2.5 2.5 0 0 0-2.5 2.5v.2A2.5 2.5 0 0 0 5 9.5v1A2.5 2.5 0 0 0 6.5 13v.5A2.5 2.5 0 0 0 9 16v1.5A2.5 2.5 0 0 0 11.5 20h1"/><path d="M15 4.5a2.5 2.5 0 0 1 2.5 2.5v.2A2.5 2.5 0 0 1 19 9.5v1A2.5 2.5 0 0 1 17.5 13v.5A2.5 2.5 0 0 1 15 16v1.5A2.5 2.5 0 0 1 12.5 20h-1"/><path d="M9 4.5A2.5 2.5 0 0 1 11.5 2h1A2.5 2.5 0 0 1 15 4.5"/>',
  scale: '<path d="M12 3v18"/><path d="M5 8l-3 6a3.5 3.5 0 0 0 6 0l-3-6z"/><path d="M19 8l-3 6a3.5 3.5 0 0 0 6 0l-3-6z"/><path d="M5 8h14"/><path d="M8 21h8"/>',
  trophy: '<path d="M8 4h8v5a4 4 0 0 1-8 0V4z"/><path d="M8 5H4v1a4 4 0 0 0 4 4"/><path d="M16 5h4v1a4 4 0 0 1-4 4"/><path d="M10 15v2"/><path d="M14 15v2"/><path d="M8 21h8"/><path d="M9 17h6l1 4H8l1-4z"/>',
  meh: '<circle cx="12" cy="12" r="9"/><path d="M8 15h8"/><path d="M9 9h.01"/><path d="M15 9h.01"/>',
  sprout: '<path d="M12 21V10"/><path d="M12 10C12 6 9 4 4 4c0 5 3 8 8 8"/><path d="M12 10c0-4 3-6 8-6 0 5-3 8-8 8"/>',
  'check-square': '<rect x="3" y="3" width="18" height="18" rx="3"/><path d="M8 12l3 3 5-6"/>',
  square: '<rect x="3" y="3" width="18" height="18" rx="3"/>',
  grimace: '<circle cx="12" cy="12" r="9"/><path d="M9 9h.01"/><path d="M15 9h.01"/><path d="M8 15h1M10.5 15h1M13 15h1M15.5 15h1"/>',
  party: '<path d="M4 20l2.5-9.5 9.5 2.5L4 20z"/><path d="M13 3l2 2"/><path d="M17 5l2 2"/><path d="M18 2l1.5 1.5"/><path d="M9.5 13.5l7-7"/>',
  warning: '<path d="M12 3l10 18H2L12 3z"/><path d="M12 10v4"/><path d="M12 17h.01"/>',
  bolt: '<path d="M13 2L4 14h6l-1 8 9-12h-6l1-8z"/>',
  headphones: '<path d="M4 14v-2a8 8 0 0 1 16 0v2"/><rect x="2" y="14" width="5" height="7" rx="2"/><rect x="17" y="14" width="5" height="7" rx="2"/>',
  flame: '<path d="M12 22a7 7 0 0 0 7-7c0-3-2-4.5-3-7-.5 2-1.5 3-2.5 2 1-3-1-5.5-3.5-7 .5 3-1 4.5-3 7-1.3 1.6-2 3-2 5a7 7 0 0 0 7 7z"/>',
  eye: '<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/>',
  lock: '<rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',
  shoe: '<path d="M3 18v-3.5c0-.7.4-1.3 1-1.7l4.5-3a2 2 0 0 1 2.4.1L14 13l4-1 3 2.5c1 .8 1.5 1.7 1.5 3V18a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z"/><path d="M3 18h18"/>',
  truck: '<rect x="1" y="7" width="13" height="10" rx="1"/><path d="M14 10h4l3 3v4h-7z"/><circle cx="6" cy="19" r="1.6"/><circle cx="17" cy="19" r="1.6"/>',
  frown: '<circle cx="12" cy="12" r="9"/><path d="M8 16c.8-1.3 2.2-2 4-2s3.2.7 4 2"/><path d="M9 9h.01"/><path d="M15 9h.01"/>',
  gift: '<rect x="3" y="9" width="18" height="12" rx="1"/><path d="M3 13h18"/><path d="M12 9v12"/><path d="M12 9c-1.5 0-4-.7-4-3a2 2 0 0 1 4 0 2 2 0 0 1 4 0c0 2.3-2.5 3-4 3z"/>',
  phone: '<path d="M6 3h3l1.5 4.5L8.5 9a12 12 0 0 0 6.5 6.5l1.5-2 4.5 1.5v3a2 2 0 0 1-2.2 2A17 17 0 0 1 4 6.2 2 2 0 0 1 6 3z"/>',
  'arrow-right': '<path d="M5 12h14"/><path d="M13 6l6 6-6 6"/>',
  'arrow-left': '<path d="M19 12H5"/><path d="M11 18l-6-6 6-6"/>',
  undo: '<path d="M4 9h9a5 5 0 0 1 0 10h-3"/><path d="M8 4L4 9l4 5"/>',
  pause: '<rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/>',
  lightbulb: '<path d="M9 18h6"/><path d="M10 21h4"/><path d="M12 3a6 6 0 0 0-3.5 10.9c.6.4.9 1 .9 1.7v.4h5.2v-.4c0-.7.3-1.3.9-1.7A6 6 0 0 0 12 3z"/>',
}
</script>

<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.8"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
    v-html="icons[name] || icons.search"
  />
</template>
