<template>
  <div>
    Home !
    <button
      @click="onClickTestBtn"
    >
      test
    </button>
  </div>
</template>
<script lang="ts">
export default {
  name: 'AppHome',
}
</script>
<script setup lang="ts">
import { ref } from 'vue'
import { useManagerStore } from '@/stores/manager'

const managerStore = useManagerStore()

const onClickTestBtn = () => {
  managerStore.openManagerApp()
}
</script>
