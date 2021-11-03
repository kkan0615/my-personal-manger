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
      class="speech-bubble-container"
    >
      <div
        class="speech-bubble"
      >
        {{ test }}
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
import { computed, onBeforeMount } from 'vue'
import { PrototypeActionTypes } from '@/store/modules/systems/prototype/actions'
import { store } from '@/store'

const test = computed(() => store.state.prototype.test)

onBeforeMount(async () => {
  await store.dispatch(PrototypeActionTypes.ADD_TEST, 'Manager is sharing same thing!')
})
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
      tw-relative
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
