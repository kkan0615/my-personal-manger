<template>
  <div
    class="relative-position window-height"
    style="height: 100vh"
    :class="{
      'draggable-region': managerStore.CurrentMangerConfig.isPossibleMove,
    }"
  >
    <div
      v-if="managerStore.CurrentMangerConfig.isPossibleMove"
      style="position: absolute; top: 0; z-index: 4"
      class="non-draggable-region"
    >
      <q-btn
        color="accent"
        @mouseenter="throughOff"
        @click="onClickFixBtn"
      >
        Fix
      </q-btn>
    </div>
    <div
      class="full-height full-width"
      @click="onClickManger"
    >
      <canvas
        id="manager-canvas"
        ref="managerCanvasRef"
        height="400"
        width="350"
      />
      <manager-main-context-menu />
    </div>
    <!--  Message boxes  -->
    <manager-main-message-box-default />
  </div>
</template>
<script lang="ts">
export default {
  name: 'ManagerMain',
}
</script>
<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { ipcRenderer } from '@/utils/electron'
import { useManagerStore } from '@/stores/manager'
import ManagerMainMessageBoxDefault from '@/views/managers/Main/components/messageBoxes/Default.vue'
import ManagerMainContextMenu from '@/views/managers/Main/components/ContextMenu.vue'

const managerStore = useManagerStore()

const managerCanvasRef = ref<HTMLCanvasElement>()

onMounted(() => {
  initCanvas()
  managerStore.setMessageStr('on mounted')
})

onBeforeUnmount(() => {
  if (managerCanvasRef.value) {
    managerCanvasRef.value?.removeEventListener('mousemove', onMouseMove)
  }
})

const throughOff = () => {
  ipcRenderer.send('through-off-manager-window')
}

const throughOn = () => {
  ipcRenderer.send('through-on-manager-window')
}

const onClickFixBtn = () => {
  managerStore.setCurrentManagerConfig({
    ...managerStore.CurrentMangerConfig,
    isPossibleMove: !managerStore.CurrentMangerConfig.isPossibleMove,
  })
}

const onMouseMove = (e: MouseEvent) => {
  const ctx = managerCanvasRef.value?.getContext('2d')
  if (ctx) {
    const img = ctx.getImageData(e.offsetX, e.offsetY, 1, 1)
    const pixBytes = img.data
    if (pixBytes.every(byte => !byte)) {
      ipcRenderer.send('through-on-manager-window')
    } else {
      ipcRenderer.send('through-off-manager-window')
    }
  }
}
const initCanvas = async () => {
  const img = new Image()
  const file = (await ipcRenderer.invoke('get-manager-images', { id: 'test1' })).main
  img.src = window.URL.createObjectURL(new Blob([managerStore.CurrentManger.main]))
  img.onload = () => {
    const ctx = managerCanvasRef.value?.getContext('2d')
    if (ctx && img && managerCanvasRef.value) {
      img.width = managerCanvasRef.value?.width || 0
      img.height = managerCanvasRef.value?.height || 0
      // managerCanvasRef.value.width = img.width
      // managerCanvasRef.value.height = img.height
      ctx.drawImage(img, 0, 0, img.width, img.height)
    }
    managerCanvasRef.value?.addEventListener('mousemove', onMouseMove)
  }
}

const onClickManger = () => {
  managerStore.clickManager()
}
</script>
