<template>
  <ul
    class="c-sidebar-layout-menu-list"
    :class="{
      [`tw-text-${textSize}`]: textSize,
      'c-sidebar-layout-menu-list--mini': isMini,
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
import { defineProps, getCurrentInstance, inject, onBeforeUnmount, onMounted, ref } from 'vue'
import { CSidebarProvideKey } from '@/components/commons/layouts/Sidebar/types'

const props = defineProps({
  textSize: {
    type: String,
    required: false,
    default: 'lg',
  }
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
.c-sidebar-layout-menu-list {
  a {
    @apply tw-flex tw-items-center;
  }
  &--mini {
    a {
      @apply tw-justify-center;
    }
  }
}
</style>
