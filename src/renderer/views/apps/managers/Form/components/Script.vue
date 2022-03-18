<template>
  <div
    class="row items-center q-col-gutter-sm"
  >
    <q-input
      v-model="name"
      class="col-grow"
      outlined
      dense
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
  let result = null
  if (props.modelValue && props.modelValue.soundFile) {
    result = props.modelValue.status === 'CREATE' ? URL.createObjectURL(props.modelValue.soundFile) : null
  }

  return result
})

const onUpdateSoundFile = (value: File) => {
  emits('update:modelValue', {
    ...props.modelValue,
    soundFile: value,
    status: 'CREATE'
  } as ManagerScriptForm)
}
</script>
