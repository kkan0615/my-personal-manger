<template>
  <div
    class="row items-center q-col-gutter-sm"
  >
    <q-input
      :model-value="modelValue.message"
      class="col-grow"
      outlined
      dense
      @update:model-value="onUpdateMessage"
    />
    <q-file
      :model-value="modelValue.soundFile"
      class="col-3"
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
  }
})
const emits = defineEmits(['update:modelValue'])

const src = computed(() => {
  let result = undefined
  if (props.modelValue && props.modelValue.soundFile) {
    result = props.modelValue.status === 'CREATE' ? URL.createObjectURL(props.modelValue.soundFile) : undefined
  }

  return result
})

const onUpdateMessage = (value: string | number | null) => {
  emits('update:modelValue', {
    message: value,
    sound: props.modelValue ? props.modelValue.sound : '',
    soundFile: value,
    status: 'CREATE'
  } as ManagerScriptForm)
}

const onUpdateSoundFile = (value: File) => {
  emits('update:modelValue', {
    message: props.modelValue ? props.modelValue.message : '',
    sound: props.modelValue ? props.modelValue.sound : '',
    soundFile: value,
    status: 'CREATE'
  } as ManagerScriptForm)
}
</script>
