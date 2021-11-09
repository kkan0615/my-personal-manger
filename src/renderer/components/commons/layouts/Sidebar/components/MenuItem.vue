<template>
  <li
    class="c-sidebar-layout-menu-item"
    :class="{
      'c-sidebar-layout-menu-item--active': active && !isInMenuGroup,
      'c-sidebar-layout-menu-item-menugroup--active': active && isInMenuGroup,
    }"
  >
    <slot />
  </li>
</template>
<script
    lang="ts"
>
export default {
  name: 'CSidebarLayoutMenuItem',
}
</script>
<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps({
  active: {
    type: Boolean,
    required: false,
    default: false,
  },
  isInMenuGroup: {
    type: Boolean,
    required: false,
    default: false,
  },
})
</script>
<style
  scoped
  lang="scss"
>
.c-sidebar-layout-menu-item {
  @apply tw-p-1 tw-px-3 tw-text-gray-500 tw-flex tw-items-center tw-transition tw-ease-out tw-duration-200 hover:tw-text-current tw-cursor-pointer;

  &--active {
    @apply tw-py-1 tw-text-current tw-bg-gray-500 tw-rounded;
  }

  &-menugroup--active {
    @apply tw-p-1 tw-text-current;
  }
}
</style>
