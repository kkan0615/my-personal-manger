<template>
  <li
    class="tw-flex tw-items-center tw-px-2 tw-py-1"
  >
    <slot />
  </li>
</template>
<script
    lang="ts"
>
export default {
  name: 'CListTitle',
}
</script>
<script setup lang="ts">
import { ref } from 'vue'
</script>
