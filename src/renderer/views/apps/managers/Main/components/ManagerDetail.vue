<template>
  <q-card-section>
    <div>
      Hello Scripts
    </div>
    <div
      class="column q-col-gutter-sm"
    >
      <div
        v-for="(script, i) in manager.helloScriptList"
        :key="`hello-script-${i}`"
      >
        <app-manager-main-script
          :script="script"
        />
      </div>
    </div>
  </q-card-section>
</template>
<script lang="ts">
export default {
  name: 'AppManagerMainManagerDetail',
}
</script>
<script setup lang="ts">
import { defineProps, PropType } from 'vue'
import { Manager } from '@main/types/managers'
import AppManagerMainScript from '@/views/apps/managers/Main/components/Script.vue'

const props = defineProps({
  manager: {
    type: Object as PropType<Manager>,
    required: true,
    default: () => {}
  }
})
</script>
