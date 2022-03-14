<template>
  <div
    class="col-3 text-caption"
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
import { ref } from 'vue'
</script>
