<template>
  <div>
    <div
      class="tw-text-2xl"
    >
      Home
    </div>
    <button
      class="btn btn-primary"
      type="button"
      @click="onClickOpenMangerBtn"
    >
      open the manager
    </button>
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
const electron = window.require('electron')
const onClickOpenMangerBtn = () => {
  electron.ipcRenderer.send('open-manager')
}
</script>
