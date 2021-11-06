<template>
  <router-view />
</template>
<script setup lang="ts">
import useStore from '@/store'
import { ManagerActionTypes } from '@/store/modules/model/manager/actions'
import { useRouter } from 'vue-router'

const electron = window.require('electron')

const store = useStore()
const router = useRouter()

// import { ipcRenderer } from 'electron'
electron.ipcRenderer.on('sync-manager', async (event, args) => {

  try {
    await store.dispatch(ManagerActionTypes.SET_MANAGER, args)
    // await store.dispatch(ManagerActionTypes.HELLO_MANAGER)
  } catch (e) {
    console.error(e)
  }
})

electron.ipcRenderer.on('move-manager', async () => {
  try {
    await router.replace({ name: 'OverlayManager' })
  } catch (e) {
    console.error(e)
  }
})

// onMounted(async () => {
//   electron.ipcRenderer.send('sync-manager')
// })
</script>
<style
  lang="scss"
>
div {
  background-color: transparent;
}
/*#app {*/
/*  !*font-family: Avenir, Helvetica, Arial, sans-serif;*!*/
/*  !*-webkit-font-smoothing: antialiased;*!*/
/*  !*-moz-osx-font-smoothing: grayscale;*!*/
/*  !*text-align: center;*!*/
/*  !*color: #2c3e50;*!*/
/*  !*margin-top: 60px;*!*/
/*}*/
</style>
