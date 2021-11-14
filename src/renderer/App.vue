<template>
  <router-view />
</template>
<script setup lang="ts">
import useStore from '@/store'
import { ManagerActionTypes } from '@/store/modules/model/manager/actions'
import { useRouter } from 'vue-router'
import useElectron from '@/mixins/useElectron'
import { onMounted } from 'vue'

const { ipcRenderer } = useElectron()

const store = useStore()
const router = useRouter()

onMounted(async () => {
  const managerConfig = await ipcRenderer.invoke('sync-manager-config')
  await store.dispatch(ManagerActionTypes.SET_MANAGER_CONFIG, managerConfig)

  const manager = await ipcRenderer.invoke('sync-manager')
  await store.dispatch(ManagerActionTypes.SET_MANAGER, manager)
})

/* Move to home */
ipcRenderer.on('move-home', async () => {
  try {
    await router.push({ name: 'Home' })
  } catch (e) {
    console.error(e)
  }
})

/* Move to manager */
ipcRenderer.on('move-manager', async () => {
  try {
    await router.replace({ name: 'MangerBaseLayout' })
  } catch (e) {
    console.error(e)
  }
})

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
