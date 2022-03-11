<template>
  <div
    class="row q-mb-md"
  >
    <div
      class="text-h5"
    >
      {{ tittle }}
    </div>
  </div>
</template>
<script lang="ts">
export default {
  name: 'CLayoutMenubar',
}
</script>
<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps({
  tittle: {
    type: String,
    required: true,
    default: '',
  }
})
</script>
