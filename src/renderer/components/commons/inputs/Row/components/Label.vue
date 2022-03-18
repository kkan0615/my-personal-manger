<template>
  <div
    class="col-3 text-caption"
    :class="{
      'q-pt-sm': !dense
    }"
  >
    <slot />
  </div>
</template>
<script lang="ts">
export default {
  name: 'CRowInputLabel',
}
</script>
<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps({
  dense: {
    type: Boolean,
    required: false,
    default: false,
  }
})
</script>
