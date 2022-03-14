<template>
  <div
    class="row"
  >
    <slot />
  </div>
</template>
<script lang="ts">
export default {
  name: 'CRowInput',
}
</script>
<script setup lang="ts">
import { ref } from 'vue'
</script>
