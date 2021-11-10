<template>
  <span
    class="tw-select-none"
    :class="{
      [`material-icons-${type}`]: type,
      'material-icons': !type,
      [`tw-text-${size}`]: true,
      'tw-mr-2': left,
    }"
  >
    <slot />
  </span>
</template>
<script
    lang="ts"
>
export default {
  name: 'CMaterialIcon',
}
</script>
<script setup lang="ts">
import type { PropType } from 'vue'
import { defineProps } from 'vue'

const props = defineProps({
  size: {
    type: String,
    required: false,
    default: 'xl',
  },
  type: {
    type: String as PropType<'' | 'round' | 'outlined' | 'sharp' | 'two-tone'>,
    required: false,
    default: 'round',
  },
  left: {
    type: Boolean,
    required: false,
    default: false,
  },
})
</script>
