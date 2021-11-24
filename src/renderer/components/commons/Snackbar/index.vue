<template>
  <div
    ref="toastRef"
    class="toast"
    role="alert"
    aria-live="assertive"
    aria-atomic="true"
    data-bs-delay="2500"
  >
    <div class="toast-header">
      <div
        class="rounded tw-w-4 tw-h-4 tw-mr-2"
        :class="{
          [`tw-bg-bs-${snackbar.type}`]: true,
        }"
        alt="..."
      />
      <strong class="me-auto">{{ snackbar.title }}</strong>
      <button
        type="button"
        class="btn-close"
        data-bs-dismiss="toast"
        aria-label="Close"
        @click="onClickCloseBtn"
      />
    </div>
    <div class="toast-body">
      {{ snackbar.content }}
    </div>
  </div>
</template>
<script lang="ts">
export default {
  name: 'CSnackbar',
}
</script>
<script setup lang="ts">
import { defineProps, onMounted, onUnmounted, PropType, ref } from 'vue'
import { Snackbar } from '@/types/applications/Snackbar'
import { Toast as BToast } from 'bootstrap'
import { ApplicationActionTypes } from '@/store/modules/systems/application/actions'
import useStore from '@/store'

const props = defineProps({
  snackbar: {
    type: Object as PropType<Snackbar>,
    required: false,
    default: () => {}
  }
})

const store = useStore()

const toastRef = ref<HTMLDivElement | undefined>(undefined)

onMounted(() => {
  if (toastRef.value) {
    const toast = new BToast(toastRef.value as any)
    toastRef.value.addEventListener('hide.bs.toast', handleCloseEvent)
    toast.show()
  }
})

onUnmounted(() => {
  if (toastRef.value) {
    const toast = new BToast(toastRef.value as any)
    toast.hide()
    toastRef.value.removeEventListener('hide.bs.toast', handleCloseEvent)
  }
})

const handleCloseEvent = async () => {
  if (props.snackbar) {
    await store.dispatch(ApplicationActionTypes.REMOVE_SNACKBAR_FROM_LIST, props.snackbar.id)
  }
  // if (props.toast.afterClose)
  //   props.toast.afterClose()
}
const onClickCloseBtn = async () => {
  if (props.snackbar) {
    await store.dispatch(ApplicationActionTypes.REMOVE_SNACKBAR_FROM_LIST, props.snackbar.id)
  }
  // if (props.toast.afterClose)
  //   props.toast.afterClose()
}
</script>
