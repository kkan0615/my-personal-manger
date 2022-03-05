<template>
  <router-view />
</template>
<script lang="ts">
export default {
  name: 'ManagerLayout',
}
</script>
<script setup lang="ts">
import { useManagerStore } from '@/stores/manager'
import { onBeforeUnmount } from 'vue'

const managerStore = useManagerStore()

/* created life cycles */
managerStore.subscribeManageEvents()

onBeforeUnmount(() => {
  managerStore.unsubscribeManageEvents()
})

</script>
<style
  lang="scss"
>
div {
  background-color: transparent;
}
</style>
