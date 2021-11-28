<template>
  <button
    type="button"
    class="btn"
  >
    <slot />
  </button>
</template>
<script
    lang="ts"
>
export default {
  name: 'CButton',
}
</script>
<script setup lang="ts">
import { ref } from 'vue'
</script>
