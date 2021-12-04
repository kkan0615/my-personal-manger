<template>
  <router-view />
</template>
<script
    lang="ts"
>
export default {
  name: 'BaseManagerLayout',
}
</script>
<script setup lang="ts">
import { computed } from 'vue'
import useStore from '@/store'
import { useRouter } from 'vue-router'
import useElectron from '@/mixins/useElectron'
import { ManagerActionTypes } from '@/store/modules/model/manager/actions'

const store = useStore()
const router = useRouter()
const { ipcRenderer } = useElectron()

const managerConfig = computed(() => store.state.current.managerConfig)

/* Move to specific place */
if (managerConfig.value && managerConfig.value.displayStyle === 'CIRCLE') {
  router.push({ name: 'CircleManager' })
} else {
  router.push({ name: 'FullManager' })
}

ipcRenderer.on('on-schedule-message', async (_, args) => {
  try {
    await store.dispatch(ManagerActionTypes.SET_MESSAGE, args.title)
  } catch (e) {
    console.error(e)
  }
})

</script>
