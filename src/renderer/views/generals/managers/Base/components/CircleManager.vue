<template>
  <div
    class="circle-manager-container"
  >
    <img
      ref="imgRef"
      class="tw-w-auto tw-h-auto tw-cursor-pointer tw-bg-transparent tw-object-cover "
      alt="manager"
      :src="imgSrc"
      loading="lazy"
    >
  </div>
</template>
<script
    lang="ts"
>
export default {
  name: 'BaseMangerCircleManager',
}
</script>
<script setup lang="ts">
import useStore from '@/store'
import { computed, onMounted, ref } from 'vue'
import useElectron from '@/mixins/useElectron'
import { Manager } from '@/types/models/Manager'
import { ManagerMutationTypes } from '@/store/modules/model/manager/mutations'

const store = useStore()
const { ipcRenderer } = useElectron()

const imgSrc = ref()

const manager = computed(() => store.state.manager.manager)

onMounted(async () => {
  store.subscribe(async mutation => {
    if (mutation.type === ManagerMutationTypes.SET_MANAGER) {
      imgSrc.value = await getImageFile()
    }
  })

  imgSrc.value = await getImageFile()
})

const getImageFile = async () => {
  const imageBuffer: Buffer = await ipcRenderer.invoke('get-manager-circle-image', {
    id: manager.value.id,
    circleImg: manager.value.circleImg
  } as Manager)
  const imgData = new Blob([imageBuffer], { type: 'image/png' })
  return URL.createObjectURL(imgData)
}

</script>
