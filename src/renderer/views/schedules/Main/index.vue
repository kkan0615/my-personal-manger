<template>
  <div
    class="q-pa-md window-height"
  >
    <form-schedule
      @finish:save="onFinishSave"
    />
  </div>
</template>
<script lang="ts">
export default {
  name: 'ScheduleMain',
}
</script>
<script setup lang="ts">
import FormSchedule from '@/components/forms/Schedule/index.vue'
import { ipcRenderer } from '@/utils/electron'

const onFinishSave = () => {
  alert('Success to Save')
  ipcRenderer.send('destroy-schedule-window')
}
</script>
