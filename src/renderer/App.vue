<template>
  <router-view />
</template>
<script setup lang="ts">
import useStore from '@/store'
import { ManagerActionTypes } from '@/store/modules/model/manager/actions'
import { useRouter } from 'vue-router'
import useElectron from '@/mixins/useElectron'
import { onMounted } from 'vue'
import { CurrentActionTypes } from '@/store/modules/systems/current/actions'

const { ipcRenderer } = useElectron()

const store = useStore()
const router = useRouter()

onMounted(async () => {
  /* Load user data */
  await store.dispatch(CurrentActionTypes.LOAD_USER)
  /* Load manager config */
  await store.dispatch(ManagerActionTypes.LOAD_MANAGER_CONFIG)
  /* Load Manager */
  await store.dispatch(CurrentActionTypes.LOAD_MANAGER)
})

/* Move to home */
ipcRenderer.on('move-register', async () => {
  try {
    await router.push({ name: 'RegisterAuth' })
  } catch (e) {
    console.error(e)
  }
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
