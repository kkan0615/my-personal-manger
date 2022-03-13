<template>
  <q-btn
    round
    color="primary"
    icon="add"
    size="sm"
    @click="isOpen = !isOpen"
  >
    <q-tooltip>
      Add new Schedule
    </q-tooltip>
  </q-btn>
  <q-dialog
    v-model="isOpen"
  >
    <q-card>
      <!-- Header -->
      <q-card-section class="row items-center q-py-sm bg-primary text-white">
        <div class="text-h6">
          New Schedule
        </div>
        <q-space />
        <q-btn
          v-close-popup
          icon="close"
          flat
          round
          dense
        />
      </q-card-section>
      <q-separator />
      <q-card-section
        style="width: 350px; height: 500px;"
      >
        <form-schedule
          @finish:save="onFinishSave"
        />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<script lang="ts">
export default {
  name: 'AppScheduleMainScheduleFormDialog',
}
</script>
<script setup lang="ts">
import { ref } from 'vue'
import FormSchedule from '@/components/forms/Schedule/index.vue'
import { useQuasar } from 'quasar'
import { useScheduleStore } from '@/stores/schedule'

const $q = useQuasar()
const scheduleStore = useScheduleStore()

const isOpen = ref(false)

const onFinishSave = async () => {
  $q.notify({
    message: 'success to save',
    position: 'bottom-right'
  })
  await scheduleStore.loadScheduleList()
  isOpen.value = false
}

</script>
