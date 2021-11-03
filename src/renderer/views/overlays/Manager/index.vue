<template>
  <div
    class="draggable tw-relative"
  >
    <div
      class="tw-mb-4 manager-container tw-flex tw-flex-col tw-items-center"
    >
      <img
        class="tw-max-w-full tw-h-full"
        alt="manager"
        src="@main/assets/manager.png"
      >
    </div>
    <div
      v-if="message"
      class="speech-bubble-container"
    >
      <div
        class="speech-bubble"
      >
        {{ message }}
      </div>
    </div>
  </div>
</template>
<script
  lang="ts"
>
export default {
  name: 'PrototypeWithOutScriptSetup',
}
</script>
<script setup lang="ts">
import { computed } from 'vue'
import { store } from '@/store'

const message = computed(() => store.state.manager.message)
</script>
<style
  scoped
  lang="scss"
>
  .manager-container {
    height: 300px;
    width: 300px;
  }

  .speech-bubble-container {
    @apply
      tw-absolute
      tw-top-3/4
      tw-w-96
      tw-text-center
      tw-bg-white
      tw-rounded
      tw-shadow-xl
      tw-px-2
      tw-py-1;
  }

  .speech-bubble {
    @apply
    tw-border
    tw-border-pink-500
    tw-border-dotted
    tw-rounded
    tw-shadow-xl
    tw-px-2
    tw-py-1;
  }
</style>
