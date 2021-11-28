<template>
  <div
    class="manager-container"
    @click.stop.prevent="onClickManager"
  >
    <img
      ref="imgRef"
      class="tw-w-auto tw-h-auto tw-cursor-pointer tw-bg-transparent tw-object-cover "
      alt="manager"
      :src="imgSrc"
      draggable="false"
      loading="lazy"
      @mousedown="onMouseDown"
      @contextmenu.prevent="onClickContextMenu"
      @mouseenter="onMouseEnter"
      @mouseleave="onMouseLeave"
    >
    <circle-manager-manager-context-menu
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
  name: 'CircleManagerManager',
}
</script>
<script setup lang="ts">
import useStore from '@/store'
import { ManagerActionTypes } from '@/store/modules/model/manager/actions'
import { computed, nextTick, onMounted, ref } from 'vue'
import { offMangerThrough, onMangerThrough } from '@/utils/electrons/ipc'
import useElectron from '@/mixins/useElectron'
import { Manager } from '@/types/models/Manager'
import CircleManagerManagerContextMenu from '@/views/managers/Circle/components/ContextMenu.vue'

const store = useStore()
const { ipcRenderer } = useElectron()

const x = ref(0)
const y = ref(0)
const animationId = ref<number | undefined>(undefined)
const contextmenuX = ref(0)
const contextmenuY = ref(0)
const displayContextMenu = ref(false)
const imgSrc = ref()

const manager = computed(() => store.state.current.manager)

onMounted(async () => {
  imgSrc.value = await getImageFile()
})

const getImageFile = async () => {
  const imageBuffer: Buffer = await ipcRenderer.invoke('get-manager-circle-image', {
    id: manager.value.id,
    circleImg: manager.value.circleImg
  } as Manager)
  const imgData = new Blob([imageBuffer], { type: 'image/png' })
  return URL.createObjectURL(imgData)
}

const onClickManager = async () => {
  try {
    await store.dispatch(ManagerActionTypes.HELLO_MANAGER)
  } catch (e) {
    console.error(e)
  }
}

const onMouseUp = (event: MouseEvent) => {
  document.removeEventListener('mouseup', onMouseUp)
  if (animationId.value) {
    x.value = event.clientX
    y.value = event.clientY
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
  ipcRenderer.send('manager-stop-move-screen', { x: x.value, y: y.value })
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
  height: 50px;
  width: 50px;
}
</style>
