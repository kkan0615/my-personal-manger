<template>
  <c-card
    class="tw-h-48 tw-bg-white tw-cursor-pointer hover:tw-bg-gray-100"
    :class="{
      'tw-ring': isActive,
    }"
  >
    <div
      class="tw-p-3"
    >
      <div
        class="tw-h-32 tw-flex tw-justify-center"
      >
        <img
          class="tw-w-auto tw-h-full"
          :src="imgSrc"
          alt="manager"
        >
      </div>
      <div
        class="tw-text-lg tw-font-semibold"
      >
        {{ manager.manager.name }}
      </div>
    </div>
  </c-card>
</template>
<script lang="ts">
export default {
  name: 'BaseMangerManagerCard',
}
</script>
<script setup lang="ts">
import { computed, defineProps, onMounted, PropType, ref } from 'vue'
import CCard from '@/components/commons/Card/index.vue'
import { Manager, ManagerWithConfig } from '@/types/models/Manager'
import useElectron from '@/mixins/useElectron'
import useStore from '@/store'

const props = defineProps({
  manager: {
    type: Object as PropType<ManagerWithConfig>,
    required: true,
    default: () => {},
  },
  active: {
    type: Boolean,
    required: false,
    default: false,
  }
})

const { ipcRenderer } = useElectron()
const store = useStore()

const imgSrc = ref('')
const isActive = computed(() => store.state.manager.manager.id === props.manager?.manager.id)

onMounted(async () => {
  imgSrc.value = await getImageFile()
})

const getImageFile = async () => {
  const imageBuffer: Buffer = await ipcRenderer.invoke('get-manager-image', {
    id: props.manager?.manager.id,
    img: props.manager?.manager.img,
  } as Manager)
  const imgData = new Blob([imageBuffer], { type: 'image/png' })
  return URL.createObjectURL(imgData)
}

</script>
