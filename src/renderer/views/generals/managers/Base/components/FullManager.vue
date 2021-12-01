<template>
  <div
    class="manager-container"
  >
    <img
      ref="imgRef"
      class="tw-w-auto tw-h-full tw-cursor-pointer tw-bg-transparent"
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
  name: 'BaseMangerFullManager',
}
</script>
<script setup lang="ts">
import useStore from '@/store'
import { computed, onMounted, ref } from 'vue'
import { Manager } from '@/types/models/Manager'
import useElectron from '@/mixins/useElectron'
import { CurrentMutationTypes } from '@/store/modules/systems/current/mutations'

const store = useStore()
const { ipcRenderer } = useElectron()

const imgSrc = ref()

const manager = computed(() => store.state.current.manager)

onMounted(async () => {
  store.subscribe(async mutation => {
    if (mutation.type === CurrentMutationTypes.SET_MANAGER) {
      imgSrc.value = await getImageFile()
    }
  })
  imgSrc.value = await getImageFile()
})

const getImageFile = async () => {
  const imageBuffer: Buffer = await ipcRenderer.invoke('get-manager-image', {
    id: manager.value.id,
    img: manager.value.img,
    circleImg: manager.value.circleImg
  } as Manager)
  const imgData = new Blob([imageBuffer], { type: 'image/png' })
  return URL.createObjectURL(imgData)
}

</script>
