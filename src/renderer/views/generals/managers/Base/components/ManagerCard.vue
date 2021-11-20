<template>
  <c-card
    class="tw-bg-white"
  >
    <div>
      <img
        class="tw-h-32"
        :src="imgSrc"
        alt="manager"
      >
    </div>
    <div>
      {{ manager.manager.name }}
    </div>
  </c-card>
</template>
<script lang="ts">
export default {
  name: 'BaseMangerManagerCard',
}
</script>
<script setup lang="ts">
import { defineProps, onMounted, PropType, ref } from 'vue'
import CCard from '@/components/commons/Card/index.vue'
import { Manager, ManagerWithConfig } from '@/types/models/Manager'
import useElectron from '@/mixins/useElectron'

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

const imgSrc = ref('')

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
