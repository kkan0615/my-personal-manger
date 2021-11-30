<template>
  <div
    class="input-group has-validation tw-items-center"
  >
    <slot
      name="prepend"
    />
    <slot>
      <div>
        <input
          ref="inputRef"
          hidden
          type="file"
          accept="image/*"
          @change="onChangeInput"
        >
        <div
          class="tw-border tw-rounded tw-p-2"
        >
          <div
            :style="{
              width: width,
              height: height
            }"
          >
            <slot
              v-if="!modelValue"
              name="empty-image-card"
            >
              <div
                class="tw-w-full tw-h-full tw-p-4 tw-flex tw-items-center tw-justify-center"
              >
                {{ width }} X {{ height }}
              </div>
            </slot>
            <img
              v-else
              :src="imagePreview"
              alt="manager preview"
              class="tw-w-full tw-h-full tw-bg-transparent"
            >
          </div>
        </div>
        <c-button
          class="btn-sm btn-primary tw-w-full tw-mt-1"
          @click="onClickUploadBtn"
        >
          Upload
        </c-button>
      </div>
    </slot>
    <slot
      name="append"
    />
    <div class="invalid-feedback">
      {{ errorMessage }}
    </div>
  </div>
</template>
<script
    lang="ts"
>
export default {
  name: 'CImageInput',
}
</script>
<script setup lang="ts">
import {
  computed,
  defineEmits,
  defineProps,
  getCurrentInstance,
  inject,
  onBeforeUnmount,
  onMounted,
  PropType,
  ref
} from 'vue'
import { BFormProvideKey } from '@/components/commons/Form/types'
import { InputRuleType } from '@/types/libs/components/form'
import { validate } from '@/utils/libs/bootstraps/form'
import CButton from '@/components/commons/Button/index.vue'

const props = defineProps({
  id: {
    type: String,
    required: false,
    default: ''
  },
  readonly: {
    type: Boolean,
    required: false,
    default: false,
  },
  disabled: {
    type: Boolean,
    required: false,
    default: false,
  },
  size: {
    type: String,
    required: false,
    default: 'sm'
  },
  height: {
    type: String,
    required: false,
    default: '300px'
  },
  width: {
    type: String,
    required: false,
    default: 'auto'
  },
  rules: {
    type: Array as PropType<Array<InputRuleType>>,
    required: false,
    default: () => []
  },
  modelValue: {
    required: false,
  },
})

const emits = defineEmits(['update:modelValue'])

const errorMessage = ref('')
const inputRef = ref<HTMLInputElement>()

const form = inject(BFormProvideKey)

const imagePreview = computed(() => {
  if (props.modelValue) {
    const imgData = new Blob([props.modelValue as any], { type: 'image/png' })
    return URL.createObjectURL(imgData)
  } else {
    return ''
  }
})

onMounted(() => {
  const instance = getCurrentInstance()
  if (instance && form)
    form.register({ inputValidate, uid: instance.uid } as InstanceType<any>)
})

onBeforeUnmount(() => {
  const instance = getCurrentInstance()
  if (instance && form)
    form.unregister(instance.uid)
})

// @TODO: Event 변경
const onInput = (event: any) => {
  if (event.target) {
    const elemet = event.target as HTMLInputElement
    inputValidate(elemet.value)

    emits('update:modelValue', elemet.value)
  }
}

const inputValidate = (value = props.modelValue) => {
  const result = validate(value, props.rules as Array<InputRuleType>)

  if (typeof result === 'string') {
    errorMessage.value = result
  } else {
    errorMessage.value = result ? '' : 'invalid'
  }

  return result
}

const focus = () => {
  if (inputRef.value)
    inputRef.value.focus()
}

const onClickUploadBtn = () => {
  if (inputRef.value) {
    inputRef.value?.click()
  }
}

const onChangeInput = (event: Event) => {
  emits('update:modelValue', (event.target as any).files[0])
}

</script>
