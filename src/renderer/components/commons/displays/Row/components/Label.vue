<template>
  <div
    class="c-row-display-label"
  >
    <span
      v-if="required"
      class="tw-text-red-500"
    >
      *
    </span>
    <slot />
  </div>
</template>
<script lang="ts">
export default {
  name: 'CRowDisplayLabel',
}
</script>
<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps({
  required: {
    type: Boolean,
    required: false,
    default: false,
  }
})
</script>
