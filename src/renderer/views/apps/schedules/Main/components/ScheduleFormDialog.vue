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
    <q-card
      style="width: 350px; height: 450px;"
    >
      <q-card-section
        class="full-height"
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
  $q.notify('success to save')
  await scheduleStore.loadScheduleList()
  isOpen.value = false
}

</script>
