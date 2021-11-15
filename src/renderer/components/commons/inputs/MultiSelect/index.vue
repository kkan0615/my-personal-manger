<!--
  base lib: https://github.com/vueform/multiselect
  @TODO:
    1. add size handler
-->
<template>
  <div
    class="tw-p-0 tw-w-full has-validation"
  >
    <slot
      name="prepend"
    />
    <multiselect
      :id="id"
      :model-value="modelValue"
      :disabled="disabled"
      :placeholder="placeholder"
      :readonly="readonly"
      :mode="mode"
      :searchable="searchable"
      :close-on-select="closeOnSelect"
      :create-tag="createTag"
      class="form-control"
      :class="{
        'is-invalid': errorMessage,
        'form-select-sm': size === 'sm',
        'form-select-lg': size === 'lg',
      }"
      :classes="{
        tags: 'multiselect-tags tw-w-1',
      }"
      :options="options"
      @change="onChangeSelect"
    >
      <template
        #singlelabel="{ value }"
      >
        <slot
          name="singlelabel"
          v-bind="value"
        />
      </template>
      <template
        #option="{ option }"
      >
        <slot
          name="option"
          v-bind="{ option }"
        />
      </template>
    </multiselect>
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
  name: 'CMultiSelect',
}
</script>
<script setup lang="ts">
import type { PropType } from 'vue'
import {
  ref,
  inject,
  onMounted,
  getCurrentInstance,
  onBeforeUnmount,
  defineProps,
  defineEmits
} from 'vue'
import Multiselect from '@vueform/multiselect'
import { BFormProvideKey } from '@/components/commons/Form/types'
import { InputRuleType } from '@/types/libs/bootstraps/form'
import { validate } from '@/utils/libs/bootstraps/form'

const props = defineProps({
  modelValue: {
    type: [Array, String, Number],
    required: false,
    default: ''
  },
  options: {
    type: Array,
    required: true,
    default: () => {}
  },
  mode: {
    type: String as PropType<'single' | 'multiple' | 'tags'>,
    required: false,
    default: 'single', // single|multiple|tags
  },
  searchable: {
    type: Boolean,
    required: false,
    default: false,
  },
  closeOnSelect: {
    type: Boolean,
    required: false,
    default: true,
  },
  createTag: {
    type: Boolean,
    required: false,
    default: false,
  },
  id: {
    type: String,
    required: true,
    default: ''
  },
  placeholder: {
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
  rules: {
    type: Array,
    required: false,
    default: () => []
  }
}
)

const emits = defineEmits(['update:modelValue'])

const errorMessage = ref('')
const inputRef = ref<HTMLInputElement | null>(null)

const form = inject(BFormProvideKey)

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

const onChangeSelect = (selection: Array<any> | string | number) => {
  inputValidate(selection)
  emit('update:modelValue', selection)
}

</script>
