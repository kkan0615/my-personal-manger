<template>
  <div
    class="tw-flex tw-items-center tw-w-full tw-h-full"
    :class="{
      'tw-flex-row-reverse': isLeft,
    }"
  >
    <circle-manager-manager
      class="tw-w-2/12"
      :class="{
        'tw-mr-2': isLeft,
        'tw-ml-2': !isLeft,
      }"
    />
    <div
      v-if="message"
      class="speech-bubble-container tw-w-10/12"
    >
      <div
        class="speech-bubble"
      >
        <span>
          {{ message }}
        </span>
      </div>
    </div>
  </div>
</template>
<script
  lang="ts"
>
export default {
  name: 'CircleManager',
}
</script>
<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import useStore from '@/store'
import { useRoute } from 'vue-router'
import { ManagerActionTypes } from '@/store/modules/model/manager/actions'
import CircleManagerManager from '@/views/managers/Circle/components/Manager.vue'
import useElectron from '@/mixins/useElectron'

const store = useStore()
const route = useRoute()
// const { ipcRenderer } = useElectron()

const isLeft = ref(false)

const message = computed(() => store.state.current.message)

onMounted(async () => {
  document.body.classList.add('tw-w-96')

  await store.dispatch(ManagerActionTypes.SET_MESSAGE, route.fullPath)
  // ipcRenderer.on('manger-window-position-changing', onPositionChanged)
})

onBeforeUnmount(() => {
  document.body.classList.remove('tw-w-96')
  // ipcRenderer.removeListener('manger-window-position-changing', onPositionChanged)
})

// const onPositionChanged = (event:any, args: { x: number; y: number}) => {
//   const availWidth = window.screen.availWidth
//
//   isLeft.value = availWidth - args.x < 420
// }

</script>
<style
  scoped
  lang="scss"
>
  .speech-bubble-container {
    @apply
      tw-bg-white
      tw-rounded
      tw-shadow-xl
      tw-p-1
  }

  .speech-bubble {
    @apply
      tw-w-full
    tw-border
    tw-border-pink-500
    tw-border-dotted
    tw-rounded
    tw-shadow-xl
    tw-px-1
    tw-py-1;
  }
</style>
