<template>
  <div
    class="tw-mb-4 manager-container"
    @click.stop.prevent="onClickManager"
  >
    <img
      ref="imgRef"
      class="tw-w-auto tw-h-full tw-cursor-pointer tw-bg-transparent"
      alt="manager"
      :src="managerImgSrc"
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
import { computed, nextTick, ref } from 'vue'
// import isDev from 'electron-is-dev'
import { offMangerThrough, onMangerThrough } from '@/utils/electrons/ipc'
import useElectron from '@/mixins/useElectron'
import ManagerOverlayContextMenu from '@/views/overlays/Manager/components/ContextMenu.vue'

const store = useStore()
const { ipcRenderer } = useElectron()

const x = ref(0)
const y = ref(0)
const animationId = ref<number | undefined>(undefined)
const contextmenuX = ref(0)
const contextmenuY = ref(0)
const displayContextMenu = ref(false)

const manager = computed(() => store.state.manager.manager)
const managerImgSrc = computed(() => {
  // @TODO: ../../ 길게 되어 있는거 수정
  if (process.env.IS_DEV) {
    if (manager.value.id) {
      return new URL(`../../../../../main/data/${manager.value.id}/${manager.value.img}`, import.meta.url).href
    } else {
      return new URL('../../../../../main/default/manager.png', import.meta.url).href
    }
  } else {
    if (manager.value.id) {
      return new URL(`${process.resourcesPath}/data/${manager.value.id}/${manager.value.img}`, import.meta.url).href
    } else {
      return new URL(`${process.resourcesPath}/default/manager.png`, import.meta.url).href
    }
  }
})

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
  ipcRenderer.send('manager-move-screen', { x: x.value, y: y.value })
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
