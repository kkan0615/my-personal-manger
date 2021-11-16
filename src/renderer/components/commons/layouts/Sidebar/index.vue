<template>
  <div
    class="c-sidebar-layout"
    :class="wrapperClasses"
    @mouseover="onMouseover"
    @mouseout="onMouseout"
  >
    <slot />
  </div>
</template>
<script
    lang="ts"
>
export default {
  name: 'CSidebarLayout',
}
</script>
<script setup lang="ts">
import { computed, defineProps, onMounted, provide, ref } from 'vue'
import { CSidebarProvideKey } from '@/components/commons/layouts/Sidebar/types'

const props = defineProps({
  width: {
    type: [String, Number],
    required: false,
    default: 62,
  },
  miniWidth: {
    type: [String, Number],
    required: false,
    default: 20,
  },
  height: {
    type: [String, Number],
    required: false,
    default: 'full',
  },
  textColor: {
    type: String,
    required: false,
    default: 'white',
  },
  backgroundColor: {
    type: String,
    required: false,
    default: 'general-sidebar',
  },
  mini: {
    type: Boolean,
    required: false,
    default: false,
  }
})

const innerMini = ref(props.mini)

const wrapperClasses = computed(() => {
  return {
    [`tw-text-${props.textColor}`]: true,
    [`tw-bg-${props.backgroundColor}`]: true,
    [`tw-w-${innerMini.value ? props.miniWidth : props.width}`]: true,
    // [`hover:tw-w-${props.width}`]: props.mini,
    [`tw-h-${props.height}`]: true,
    /* If it's mini text is center */
    'tw-text-center': innerMini.value,
  }
})

onMounted(() => {
  changeAllMiniToParam(props.mini)
})

const fieldComponents = ref<Array<any>>([])

const register = (component: any) => {
  fieldComponents.value.push(component)
}
const unregister = (uid: number) => {
  const index = fieldComponents.value.findIndex(c => (c as any).uid === uid)
  if (index > -1) {
    fieldComponents.value.splice(index, 1)
  }
}

provide(CSidebarProvideKey, {
  register,
  unregister,
})

const onMouseover = () => {
  if (props.mini)
    changeAllMiniToParam(false)
}

const onMouseout = () => {
  if (props.mini)
    changeAllMiniToParam(true)
}

const changeAllMiniToParam = (bool: boolean) => {
  innerMini.value = bool
  if (fieldComponents.value && fieldComponents.value.length) {
    for (const component of fieldComponents.value) {
      if (component.setMini) {
        component.setMini(bool)
      }
    }
  }
}

</script>
<style
  scoped
  lang="scss"
>
.c-sidebar-layout {
  @apply tw-rounded-r-lg tw-flex tw-flex-col;
  transition: 0.4s;
}
</style>
