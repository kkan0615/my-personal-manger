<template>
  <div
    id="app"
  >
    <!--    <img-->
    <!--      class="draggable"-->
    <!--      alt="Vue logo"-->
    <!--      src="./assets/logo.png"-->
    <!--    >-->
    <!--    <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" />-->
    <router-view />
  </div>
</template>
<script setup lang="ts">
import { onMounted } from 'vue'
import useStore from '@/store'
import { ManagerActionTypes } from '@/store/modules/model/manager/actions'

const electron = window.require('electron')

const store = useStore()

// import { ipcRenderer } from 'electron'
electron.ipcRenderer.on('sync-manager', async (event, args) => {
  console.log('event', event)
  console.log('args', args)
  try {
    await store.dispatch(ManagerActionTypes.SET_MANAGER, args)
    await store.dispatch(ManagerActionTypes.HELLO_MANAGER)
  } catch (e) {
    console.error(e)
  }
})

onMounted(async () => {
  electron.ipcRenderer.send('sync-manager')
})
</script>
<style>
/*#app {*/
/*  !*font-family: Avenir, Helvetica, Arial, sans-serif;*!*/
/*  !*-webkit-font-smoothing: antialiased;*!*/
/*  !*-moz-osx-font-smoothing: grayscale;*!*/
/*  !*text-align: center;*!*/
/*  !*color: #2c3e50;*!*/
/*  !*margin-top: 60px;*!*/
/*}*/
</style>
