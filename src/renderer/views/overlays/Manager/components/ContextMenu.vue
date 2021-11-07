<template>
  <c-list
    class="manager-contextmenu"
    :style="{
      top: `${top}px`,
      left: `${left}px`,
    }"
    @click.stop.prevent="emits('close')"
  >
    <c-list-title>
      Menus
    </c-list-title>
    <c-list-item
      class="manager-contextmenu-item"
    >
      test
    </c-list-item>
    <c-list-item
      class="manager-contextmenu-item"
    >
      {{ top }} . {{ left }}
    </c-list-item>
  </c-list>
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
import { computed, defineEmits, defineProps } from 'vue'
import CList from '@/components/commons/List/index.vue'
import CListItem from '@/components/commons/List/components/Item.vue'
import CListTitle from '@/components/commons/List/components/Title.vue'

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
  @apply tw-absolute tw-bg-white tw-z-10 tw-w-40;
}

.manager-contextmenu-item {
  @apply tw-cursor-pointer;
}
</style>
