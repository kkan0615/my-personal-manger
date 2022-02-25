<template>
  <div
    class="relative-position window-height"
    style="height: 100vh"
  >
    <div
      style="height: 4%"
      @mouseenter="onMouseenter"
    >
      <q-btn
        color="primary"
        @click="onMouseleave"
      >
        test
      </q-btn>
      <button
        @click="onMouseenter"
      >
        test2
      </button>
    </div>
    <img
      class="draggable-region"
      src="https://www.pngplay.com/wp-content/uploads/13/New-Year-Kyaru-Transparent-PNG.png"
      style="height: 95%"
    >
  </div>
</template>
<script lang="ts">
export default {
  name: 'ManagerMain',
}
</script>
<script setup lang="ts">
import { ref } from 'vue'
import { ipcRenderer } from '@/utils/electron'

const isThrough = ref(false)

const onMouseenter = () => {
  ipcRenderer.send('through-off-manager-window')
}

const onMouseleave = () => {
  ipcRenderer.send('through-on-manager-window')
}
</script>
