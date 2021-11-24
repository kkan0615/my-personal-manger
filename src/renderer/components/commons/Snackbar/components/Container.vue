<template>
  <div
    class="toast-container"
  >
    <slot />
  </div>
</template>
<script lang="ts">
export default {
  name: 'CSnackbarContainer',
}
</script>
<script setup lang="ts">
import { ref } from 'vue'
</script>
