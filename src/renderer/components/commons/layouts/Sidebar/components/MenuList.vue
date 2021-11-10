<template>
  <ul
    class="c-sidebar-layout-menu-list"
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
<style
  lang="scss"
>
.c-sidebar-layout-menu-list {
  a {
    @apply tw-flex tw-items-center;
  }
}
</style>
