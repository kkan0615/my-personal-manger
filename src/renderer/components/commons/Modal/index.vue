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
    <slot />
  </div>
</template>
<script lang="ts">
export default {
  name: 'CPrototype',
}
</script>
<script setup lang="ts">
import { Modal as BModal } from 'bootstrap'
import { onBeforeUnmount, onMounted, ref } from 'vue'

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

const openModal = () =>{
  if (modalInstance.value) {
    modalInstance.value.show()
  }
}
</script>
