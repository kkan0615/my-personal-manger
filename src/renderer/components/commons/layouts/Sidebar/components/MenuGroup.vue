<template>
  <div>
    <div
      class="c-sidebar-layout-menu-group"
      :class="{
        'c-sidebar-layout-menu-group--active': active,
      }"
    >
      {{ label }}
    </div>
    <c-sidebar-layout-menu-list
      class="tw-pl-4"
      text-size="base"
    >
      <slot />
    </c-sidebar-layout-menu-list>
  </div>
</template>
<script
    lang="ts"
>
export default {
  name: 'CSidebarLayoutMenuGroup',
}
</script>
<script setup lang="ts">
import { defineProps } from 'vue'
import CSidebarLayoutMenuList from '@/components/commons/layouts/Sidebar/components/MenuList.vue'

const props = defineProps({
  label: {
    type: String,
    required: false,
    default: '',
  },
  active: {
    type: Boolean,
    required: false,
    default: false,
  }
})
</script>
<style
  scoped
  lang="scss"
>
.c-sidebar-layout-menu-group {
  @apply tw-text-lg tw-capitalize tw-text-gray-500 tw-flex tw-items-center tw-p-1 tw-px-4 tw-cursor-pointer tw-transition tw-ease-out tw-duration-200 hover:tw-text-current;

  &--active {
    @apply tw-bg-gray-500 tw-text-current tw-rounded;
  }
}
</style>
