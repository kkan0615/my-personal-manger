<template>
  <!-- name of character -->
  <!--  <transition-->
  <!--    appear-->
  <!--    enter-active-class="animate__animated animate__fadeInDown animate__fast"-->
  <!--    leave-active-class="animate__animated animate__fadeOutUp animate__faster"-->
  <!--  >-->
  <!--    <q-badge-->
  <!--      v-if="managerStore.IsShowMessageBox"-->
  <!--      class="q-mb-sm text-capitalize absolute z-fab"-->
  <!--      style="bottom: 44%; left: 10%;"-->
  <!--      rounded-->
  <!--      :color="managerStore.CurrentManger.color"-->
  <!--      :label="managerStore.CurrentManger.name"-->
  <!--    />-->
  <!--  </transition>-->
  <!-- message box -->
  <transition
    appear
    enter-active-class="animate__animated animate__fadeInDown animate__fast"
    leave-active-class="animate__animated animate__fadeOutUp animate__faster"
  >
    <div
      class="q-mb-sm text-capitalize absolute z-fab"
      style="bottom: 27%; width: 80%; left: 10%;"
    >
      <q-badge
        v-if="managerStore.IsShowMessageBox"
        rounded
        :color="managerStore.CurrentManger.color"
        :label="managerStore.CurrentManger.name"
      />
      <q-card
        v-if="managerStore.IsShowMessageBox"
      >
        <q-card-section
          class="q-pa-sm"
        >
          {{ managerStore.Message }}
        </q-card-section>
      </q-card>
    </div>
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
