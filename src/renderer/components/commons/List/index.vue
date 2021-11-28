<template>
  <ul
    class="c-list"
  >
    <slot />
  </ul>
</template>
<script
    lang="ts"
>
export default {
  name: 'CList',
}
</script>
<script setup lang="ts">
import { ref } from 'vue'
</script>
<style
  lang="scss"
  scoped
>
.c-list {
  @apply tw-rounded tw-flex tw-flex-col;
}
</style>
