<template>
  <transition
    appear
    enter-active-class="animate__animated animate__fadeInDown animate__fast"
    leave-active-class="animate__animated animate__fadeOutUp animate__faster"
  >
    <q-card
      v-if="managerStore.IsShowMessageBox"
      class="absolute z-fab"
      style="bottom: 35%; width: 80%; left: 10%;"
    >
      <q-card-section>
        {{ managerStore.Message }}
      </q-card-section>
    </q-card>
  </transition>
</template>
<script lang="ts">
export default {
  name: 'ManagerMainMessageBoxDefault',
}
</script>
<script setup lang="ts">
import { useManagerStore } from '@/stores/manager'

const managerStore = useManagerStore()

</script>
