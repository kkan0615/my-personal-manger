<template>
  <div
    class="relative-position window-height"
    style="height: 100vh"
    :class="{
      'draggable-region': canMove,
    }"
  >
    <div
      style="position: absolute; top: 0; z-index: 4"
      class="non-draggable-region"
    >
      <q-btn
        color="accent"
        @mouseenter="throughOff"
        @click="test"
      >
        test
      </q-btn>
    </div>
    <div
      class="full-height full-width"
      @click="onClickManger"
    >
      <!--      <q-img-->
      <!--        id="manager-image"-->
      <!--        ref="managerImgRef"-->
      <!--        fit="contain"-->
      <!--        src="./test.png"-->
      <!--        height="100%"-->
      <!--        width="100%"-->
      <!--        @load="onLoadTest"-->
      <!--      />-->
      <canvas
        id="manager-canvas"
        ref="managerCanvasRef"
        height="300"
      />
    </div>
    <q-card
      v-if="isDisplayMessageCard"
      class="absolute z-fab full-width"
      style="bottom: 25%;"
    >
      <q-card-section>
        test meesage
      </q-card-section>
    </q-card>
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
import { useSettingStore } from '@/stores/setting'

const settingStore = useSettingStore()

const canMove = ref(false)
const managerCanvasRef = ref<HTMLCanvasElement>()
const isDisplayMessageCard = ref(false)

onMounted(() => {
  initCanvas()
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

const test = () => {
  canMove.value = !canMove.value
}

const onMouseMove = (e: MouseEvent) => {
  const ctx = managerCanvasRef.value?.getContext('2d')
  if (ctx) {
    const imgd = ctx.getImageData(e.offsetX, e.offsetY, 1, 1)
    const pix = imgd.data
    if (pix.every(pixel => !pixel)) {
      ipcRenderer.send('through-on-manager-window')
    } else {
      ipcRenderer.send('through-off-manager-window')
    }
  }
}
const initCanvas = async () => {
  const img = new Image()
  const file = (await ipcRenderer.invoke('get-manager-images', { id: 'test1' })).main
  img.src = window.URL.createObjectURL(new Blob([file]))
  img.onload = () => {
    const ctx = managerCanvasRef.value?.getContext('2d')
    if (ctx && img && managerCanvasRef.value) {
      img.width = managerCanvasRef.value?.width || 0
      img.height = managerCanvasRef.value?.height || 0
      // managerCanvasRef.value.width = img.width
      // managerCanvasRef.value.height = img.height
      ctx.drawImage(img, 10, 10, img.width, img.height)
    }
    managerCanvasRef.value?.addEventListener('mousemove', onMouseMove)
  }
}

const onClickManger = () => {
  isDisplayMessageCard.value = !isDisplayMessageCard.value
}
</script>
