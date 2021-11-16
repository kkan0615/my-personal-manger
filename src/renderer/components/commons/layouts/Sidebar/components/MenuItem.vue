<template>
  <li
    class="c-sidebar-layout-menu-item"
    :class="{
      'c-sidebar-layout-menu-item--active': active && !isInMenuGroup,
      'c-sidebar-layout-menu-item-menugroup--active': active && isInMenuGroup,
      'c-sidebar-layout-menu-item--mini': isMini,
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
import { defineProps, getCurrentInstance, inject, onBeforeUnmount, onMounted, ref } from 'vue'
import { CSidebarProvideKey } from '@/components/commons/layouts/Sidebar/types'

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

const isMini = ref(false)

const cSidebar = inject(CSidebarProvideKey)

onMounted(() => {
  const instance = getCurrentInstance()
  if (instance && cSidebar)
    cSidebar.register({ setMini, uid: instance.uid } as InstanceType<any>)
})

onBeforeUnmount(() => {
  const instance = getCurrentInstance()
  if (instance && cSidebar) {
    cSidebar.unregister(instance.uid)
  }
})

const setMini = (bool: boolean) => {
  isMini.value = bool
}

</script>
<style
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

  .material-icons {
    @apply tw-mr-2;
  }
}

.c-sidebar-layout-menu-item--mini  {
  a {
    @apply tw-text-center;
  }

  .material-icons {
    @apply tw-mr-0;
  }

  .c-sidebar-menu-item--title {
    @apply tw-hidden;
  }
}
</style>
