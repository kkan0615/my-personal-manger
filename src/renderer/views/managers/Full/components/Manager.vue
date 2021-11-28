<template>
  <div
    class="tw-mb-4 manager-container"
    @click.stop.prevent="onClickManager"
    @mouseenter="onMouseEnterWrapper"
    @mouseleave="onMouseLeaveWrapper"
  >
    <full-manager-dropdown-menu
      v-if="displayDropdown"
      class="tw-absolute tw-right-0"
      @mouseenter="onMouseEnter"
      @mouseleave="onMouseLeave"
    />
    <img
      ref="imgRef"
      class="tw-w-auto tw-h-full tw-cursor-pointer tw-bg-transparent"
      alt="manager"
      :src="imgSrc"
      draggable="false"
      loading="lazy"
      @mousedown="onMouseDown"
      @contextmenu.prevent="onClickContextMenu"
      @mouseenter="onMouseEnter"
      @mouseleave="onMouseLeave"
    >
    <full-manager-manager-context-menu
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
  name: 'FullManagerManager',
}
</script>
<script setup lang="ts">
import useStore from '@/store'
import { ManagerActionTypes } from '@/store/modules/model/manager/actions'
import { computed, nextTick, onMounted, ref } from 'vue'
import { offMangerThrough, onMangerThrough } from '@/utils/electrons/ipc'
import useElectron from '@/mixins/useElectron'
import { Manager } from '@/types/models/Manager'
import FullManagerManagerContextMenu from '@/views/managers/Full/components/ContextMenu.vue'
import FullManagerDropdownMenu from '@/views/managers/Full/components/DropdownMenu.vue'

const store = useStore()
const { ipcRenderer } = useElectron()

const displayDropdown = ref(false)
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
  const imageBuffer: Buffer = await ipcRenderer.invoke('get-manager-image', {
    id: manager.value.id,
    img: manager.value.img,
    circleImg: manager.value.circleImg
  } as Manager)
  const imgData = new Blob([imageBuffer], { type: 'image/png' })
  return URL.createObjectURL(imgData)
}

const onClickManager = async () => {
  try {
    await store.dispatch(ManagerActionTypes.CLICK_MANAGER)
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

const onMouseEnterWrapper = () => {
  displayDropdown.value = true
}

const onMouseLeaveWrapper = () => {
  displayDropdown.value = false
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
