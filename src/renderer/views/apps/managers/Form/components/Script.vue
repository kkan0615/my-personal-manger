<template>
  <div
    class="row items-center q-col-gutter-sm"
  >
    <q-input
      :model-value="modelValue.message"
      class="col-7"
      outlined
      dense
      placeholder="message"
      @update:model-value="onUpdateMessage"
    />
    <q-file
      :model-value="modelValue.soundFile"
      class="col-2"
      outlined
      dense
      accept="audio/*"
      @update:model-value="onUpdateSoundFile"
    >
      <template #prepend>
        <q-icon name="attach_file" />
      </template>
    </q-file>
    <audio
      class="col-grow"
      :src="src"
      controls
    />
  </div>
</template>
<script lang="ts">
export default {
  name: 'AppManagerFormScript',
}
</script>
<script setup lang="ts">
import { computed, defineEmits, defineProps, PropType } from 'vue'
import { ManagerScriptForm } from '@/types/managers/script'

const props = defineProps({
  modelValue: {
    type: Object as PropType<ManagerScriptForm>,
    required: true,
    default: () => {}
  },
  // script: {
  //   type: Object as PropType<ManagerScriptForm>,
  //   required: true,
  //   default: () => {}
  // },
  // message: {
  //   type: String,
  //   required: true,
  //   default: null
  // },
  // soundFile: {
  //   type: File,
  //   required: false,
  //   default: null
  // },
})
const emits = defineEmits(['update:modelValue'])

const src = computed(() => props.modelValue &&  props.modelValue.soundFile
  ? window.URL.createObjectURL(new Blob([props.modelValue.soundFile])) : undefined
)

const onUpdateMessage = (value: string | number | null) => {
  console.log('value', value)
  emits('update:modelValue', {
    message: value,
    sound: props.modelValue ? props.modelValue.sound : '',
    soundFile: props.modelValue?.soundFile,
    status: 'CREATE'
  } as ManagerScriptForm)
}

const onUpdateSoundFile = (value: File) => {
  console.log('file', value)
  emits('update:modelValue', {
    message: props.modelValue ? props.modelValue.message : '',
    sound:value.name,
    soundFile: value,
    soundFileName: value.name,
    status: 'CREATE'
  } as ManagerScriptForm)
}
</script>
