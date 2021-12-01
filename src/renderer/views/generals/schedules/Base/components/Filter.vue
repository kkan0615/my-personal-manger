<template>
  <c-modal>
    <template
      #activator
    >
      <c-button
        class="btn-primary"
      >
        Filter
      </c-button>
    </template>
    Prototype
  </c-modal>
</template>
<script lang="ts">
export default {
  name: 'BaseScheduleFilter',
}
</script>
<script setup lang="ts">
import CModal from '@/components/commons/Modal/index.vue'
import CButton from '@/components/commons/Button/index.vue'
</script>
