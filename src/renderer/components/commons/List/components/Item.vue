<template>
  <li
    class="c-list-item hover:tw-bg-bs-primary"
    :class="{
      'c-list-item--selected': selected,
      'tw-border-bs-primary': selected,
    }"
  >
    <slot />
  </li>
</template>
<script
    lang="ts"
>
export default {
  name: 'CListItem',
}
</script>
<script setup lang="ts">
import { defineProps } from 'vue'
defineProps({
  selected: {
    type: Boolean,
    required: false,
    default: false
  }
})
</script>
<style
  lang="scss"
  scoped
>
.c-list-item {
  @apply tw-cursor-pointer tw-px-2 tw-py-1 hover:tw-text-white;

  &--selected {
    @apply tw-border-l-4;
  }
}
</style>
