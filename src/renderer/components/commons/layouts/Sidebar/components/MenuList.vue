<template>
  <ul
    :class="{
      [`tw-text-${textSize}`]: textSize,
    }"
  >
    <slot />
  </ul>
</template>
<script
    lang="ts"
>
export default {
  name: 'CSidebarLayoutMenuList',
}
</script>
<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps({
  textSize: {
    type: String,
    required: false,
    default: 'lg',
  }
})
</script>
