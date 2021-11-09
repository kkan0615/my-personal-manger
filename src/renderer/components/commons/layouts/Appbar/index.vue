<template>
  <div
    class="tw-flex tw-items-center rounded tw-p-1 tw-px-2 tw-w-full"
    :class="wrapperClasses"
  >
    <slot />
  </div>
</template>
<script
    lang="ts"
>
export default {
  name: 'CAppbarLayout',
}
</script>
<script setup lang="ts">
import { computed, defineProps } from 'vue'

const props = defineProps({
  height: {
    type: [String, Number],
    required: false,
    default: '16',
  },
  textColor: {
    type: String,
    required: false,
    default: '',
  },
  backgroundColor: {
    type: String,
    required: false,
    default: '',
  },
  shadow: {
    type: Boolean,
    required: false,
    default: true,
  }
})

const wrapperClasses = computed(() => {
  return {
    [`tw-text-${props.textColor}`]: props.textColor,
    [`tw-bg-${props.backgroundColor}`]: props.backgroundColor,
    [`tw-h-${props.height}`]: true,
    ['tw-shadow']: props.shadow,
  }
})
</script>
