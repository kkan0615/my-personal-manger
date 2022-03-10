<template>
  <div
    class="col-lg-10 col-sm-12"
  >
    <slot />
  </div>
</template>
<script lang="ts">
export default {
  name: 'CRowInputContent',
}
</script>
<script setup lang="ts">
import { ref } from 'vue'
</script>
