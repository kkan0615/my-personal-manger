<template>
  <slot
    v-bind="{ open: openModal }"
    name="activator"
  />
  <div
    ref="modalRef"
    class="modal fade"
    tabindex="-1"
    aria-hidden="true"
  >
    <div
      class="modal-dialog modal-dialog-centered"
      :class="{
        [`modal-${size}`]: size
      }"
    >
      <div class="modal-content">
        <slot />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
export default {
  name: 'CModal',
}
</script>
<script setup lang="ts">
import { Modal as BModal } from 'bootstrap'
import { defineProps, onBeforeUnmount, onMounted, ref } from 'vue'

const props = defineProps({
  size: {
    type: String,
    required: false,
    default: ''
  }
})

const modalRef = ref<HTMLDivElement | undefined>()
const modalInstance = ref<BModal | undefined>()

onMounted(() => {
  if (modalRef.value) {
    modalInstance.value = new BModal(modalRef.value)
  }
})

onBeforeUnmount(() => {
  if (modalInstance.value) {
    modalInstance.value.dispose()
  }
})

const openModal = () => {
  if (modalInstance.value) {
    modalInstance.value.show()
  }
}

const closeModal = () => {
  if (modalInstance.value) {
    modalInstance.value.hide()
  }
}

const disposeModal = () => {
  if (modalInstance.value) {
    modalInstance.value.dispose()
  }
}
</script>
