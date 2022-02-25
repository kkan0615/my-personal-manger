<template>
  <div
    class="relative-position window-height draggable-region"
    style="height: 100vh"
  >
    <div
      style="position: absolute; top: 0; left: 0; z-index: 3"
      class="non-draggable-region"
    >
      <q-btn
        color="primary"
        @mouseenter="throughOff"
        @click="throughOn"
      >
        throughOn
      </q-btn>
    </div>
    <div
      style="position: absolute; top: 0; right: 0; z-index: 3"
      class="non-draggable-region"
    >
      <q-btn
        color="accent"
        @mouseenter="throughOff"
        @click="throughOff"
      >
        throughOff
      </q-btn>
    </div>
    <div
      class="full-height full-width"
    >
      <q-img
        fit="contain"
        src="https://www.pngplay.com/wp-content/uploads/13/New-Year-Kyaru-Transparent-PNG.png"
        height="100%"
        width="100%"
      />
    </div>
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

const throughOff = () => {
  ipcRenderer.send('through-off-manager-window')
}

const throughOn = () => {
  ipcRenderer.send('through-on-manager-window')
}
</script>
