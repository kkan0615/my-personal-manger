<template>
  <q-card-section>
    {{ manager }}
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

const props = defineProps({
  manager: {
    type: Object as PropType<Manager>,
    required: true,
    default: () => {}
  }
})
</script>
