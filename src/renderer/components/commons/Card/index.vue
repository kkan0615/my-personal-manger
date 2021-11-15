<template>
  <div
    class="tw-border tw-rounded"
  >
    <slot />
  </div>
</template>
<script
    lang="ts"
>
export default {
  name: 'CCard',
}
</script>
<script setup lang="ts">
import { ref } from 'vue'
</script>
