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
const electron = window.require('electron')
// import { ipcRenderer } from 'electron'

electron.ipcRenderer.on('sync-manager', (event, args) => {
  console.log('event', event)
  console.log('args', args)
})
</script>
<style>
#app {
  /*font-family: Avenir, Helvetica, Arial, sans-serif;*/
  /*-webkit-font-smoothing: antialiased;*/
  /*-moz-osx-font-smoothing: grayscale;*/
  /*text-align: center;*/
  /*color: #2c3e50;*/
  /*margin-top: 60px;*/
}
</style>
