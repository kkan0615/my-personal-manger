<template>
  <div
    class="row items-center"
  >
    <!--        <audio-->
    <!--          ref="audioElement"-->
    <!--          :src="src"-->
    <!--        />-->
    <q-btn
      class="q-mr-sm"
      :icon="icon"
      flat
      rounded
      @click="onClickPlayBtn"
    />
    <div>
      {{ script.message }}
    </div>
  </div>
</template>
<script lang="ts">
export default {
  name: 'AppManagerMainScript',
}
</script>
<script setup lang="ts">
import { computed, defineProps, onBeforeUnmount, onMounted, PropType, ref } from 'vue'
import { ManagerScript } from '@/types/managers/script'
import { useManagerStore } from '@/stores/manager'

const props = defineProps({
  script: {
    type: Object as PropType<ManagerScript>,
    required: true,
    default: () => {}
  }
})

const managerStore = useManagerStore()

const audioElement = ref<HTMLAudioElement>()
const audioStatus = ref<'playing' | 'paused'>('paused')

const src = computed(() => window.URL.createObjectURL(new Blob([props.script.soundFile])))

onMounted(() => {
  if (props.script && props.script.soundFile) {
    audioElement.value = new Audio(window.URL.createObjectURL(new Blob([props.script.soundFile])))
    audioElement.value.volume = managerStore.CurrentMangerConfig.volume * 0.01
    audioElement.value?.addEventListener('pause', onPause)
    audioElement.value?.addEventListener('play', onPlay)
  }
})

onBeforeUnmount(() => {
  if (audioElement.value) {
    audioElement.value?.removeEventListener('pause', onPause)
    audioElement.value?.removeEventListener('play', onPlay)
  }
})

const icon = computed(() => {
  let result = 'play_arrow'
  if (audioStatus.value === 'paused')
    result = 'play_arrow'
  else
    result = 'pause'
  return result
})

const onClickPlayBtn = () => {
  if (audioElement.value?.paused) {
    audioElement.value?.play()
  } else {
    audioElement.value?.pause()
  }
}

const onPause = () => {
  audioStatus.value = 'paused'
}

const onPlay = () => {
  audioStatus.value = 'playing'
}
</script>
