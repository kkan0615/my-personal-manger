<template>
  <div
    class="tw-mb-4 manager-container"
    @click.stop.prevent="onClickManager"
  >
    <img
      ref="imgRef"
      class="tw-w-auto tw-h-full tw-cursor-pointer tw-bg-transparent"
      alt="manager"
      src="@main/assets/manager.png"
      draggable="false"
      @mousedown="onMouseDown"
      @contextmenu.prevent="onClickContextMenu"
      @mouseenter="onMouseEnter"
      @mouseleave="onMouseLeave"
    >
    <manager-overlay-context-menu
      v-if="displayContextMenu"
      :top="contextmenuY"
      :left="contextmenuX"
      @close="displayContextMenu = false"
    />
  </div>
</template>
<script
    lang="ts"
>
export default {
  name: 'ManagerOverlayManager',
}
</script>
<script setup lang="ts">
import useStore from '@/store'
import { ManagerActionTypes } from '@/store/modules/model/manager/actions'
import { nextTick, ref } from 'vue'
import ManagerOverlayContextMenu from '@/views/overlays/Manager/components/ContextMenu.vue'
import { offMangerThrough, onMangerThrough } from '@/utils/electrons/ipc'
const electron = window.require('electron')

const store = useStore()
const x = ref(0)
const y = ref(0)
const animationId = ref<number | undefined>(undefined)
const contextmenuX = ref(0)
const contextmenuY = ref(0)
const displayContextMenu = ref(false)

const onClickManager = async () => {
  try {
    await store.dispatch(ManagerActionTypes.HELLO_MANAGER)
  } catch (e) {
    console.error(e)
  }
}

const onMouseUp = () => {
  document.removeEventListener('mouseup', onMouseUp)
  if (animationId.value) {
    cancelAnimationFrame(animationId.value)
  }
}

const onMouseDown = (event: MouseEvent) => {
  x.value = event.clientX
  y.value = event.clientY
  document.addEventListener('mouseup', onMouseUp)
  requestAnimationFrame(moveWindow)
}

const moveWindow = () => {
  electron.ipcRenderer.send('manager-move-screen', { x: x.value, y: y.value })
  animationId.value = requestAnimationFrame(moveWindow)
}

const onClickContextMenu = (event: MouseEvent) => {
  if (!displayContextMenu.value) {
    contextmenuX.value = event.clientX
    contextmenuY.value = event.clientY
  }

  nextTick(() => {
    displayContextMenu.value = !displayContextMenu.value
  })
}

const onMouseEnter = () => {
  offMangerThrough()
}

const onMouseLeave = () => {
  onMangerThrough()
}

</script>
<style
    scoped
    lang="scss"
>
.manager-container {
  @apply tw-flex tw-justify-center tw-bg-transparent;
  height: 300px;
  width: auto;
}
</style>
