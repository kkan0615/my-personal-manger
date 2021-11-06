<template>
  <ul
    class="manager-contextmenu"
    :style="{
      top,
      left,
    }"
    @click.stop.prevent="emits('close')"
  >
    <li
      class="manager-contextmenu-item"
    >
      test
    </li>
  </ul>
</template>
<script
    lang="ts"
>
export default {
  name: 'ManagerOverlayContextMenu',
}
</script>
<script setup lang="ts">
import useStore from '@/store'
import { useRoute } from 'vue-router'
import { defineEmits, defineProps } from 'vue'

const props = defineProps({
  top: {
    type: Number,
    required: false,
    default: 0,
  },
  left: {
    type: Number,
    required: false,
    default: 0,
  },
})

const emits = defineEmits(['close'])

const store = useStore()
const route = useRoute()

</script>
<style
  scoped
  lang="scss"
>
.manager-contextmenu {
  @apply tw-absolute tw-bg-white tw-rounded tw-px-2 tw-py-1 tw-z-10;
}

.manager-contextmenu-item {
  @apply tw-cursor-pointer;
}
</style>
