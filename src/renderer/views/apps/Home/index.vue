<template>
  <div>
    <!--  -->
  </div>
</template>
<script lang="ts">
export default {
  name: 'AppHome',
}
</script>
<script setup lang="ts">
import { useManagerStore } from '@/stores/manager'

const managerStore = useManagerStore()

const onClickTestBtn = () => {
  managerStore.openManagerWindow()
}
</script>
