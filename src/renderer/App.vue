<template>
  <router-view />
</template>
<script lang="ts">
export default {
  name: 'App',
}
</script>
<script setup lang="ts">
import { ipcRenderer } from '@/utils/electron'
import { useRouter } from 'vue-router'
import { useSettingStore } from '@/stores/setting'

const settingStore = useSettingStore()
const router = useRouter()

settingStore.loadAppSetting()

const redirectToApp = () => {
  router.push({ name: 'AppHome' })
}

const redirectToManger = () => {
  router.push({ name: 'ManagerMain' })
}

ipcRenderer.on('redirect-to-app', redirectToApp)
ipcRenderer.on('redirect-to-manager', redirectToManger)
</script>
<style
    lang="scss"
>
body {
  margin: 0;
}
</style>
