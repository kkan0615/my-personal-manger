<template>
  <div
    class="tw-rounded-r-lg tw-flex tw-flex-col"
    :class="wrapperClasses"
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
import { computed, defineProps } from 'vue'

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

const wrapperClasses = computed(() => {
  return {
    [`tw-text-${props.textColor}`]: true,
    [`tw-bg-${props.backgroundColor}`]: true,
    [`tw-w-${props.mini ? props.miniWidth : props.width}`]: true,
    [`tw-h-${props.height}`]: true,
    /* If it's mini text is center */
    'tw-text-center': props.mini,
  }
})

</script>
