<template>
  <c-modal>
    <template
      #activator="{ open, }"
    >
      <c-button
        class="btn-success tw-mr-2"
        @click="open"
      >
        {{ $t('commons.Actions.create') }}
      </c-button>
    </template>
    <div>
      <div class="modal-header">
        <h5
          class="modal-title"
        >
          test
        </h5>
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="modal"
          aria-label="Close"
        />
      </div>
      <div
        class="tw-p-4"
      >
        content
      </div>
    </div>
  </c-modal>
</template>
<script lang="ts">
export default {
  name: 'BaseScheduleCreateDialog',
}
</script>
<script setup lang="ts">
import CModal from '@/components/commons/Modal/index.vue'
import CButton from '@/components/commons/Button/index.vue'
</script>
