<template>
  <q-select
    :model-value="modelValue"
    :outlined="outlined"
    :dense="dense"
    :filled="filled"
    :use-chips="useChips"
    :multiple="multiple"
    :rules="rules"
    :options="options"
    :readonly="readonly"
    :disable="disabled"
    :placeholder="placeholder"
    use-input
    input-debounce="0"
    @update:model-value="onUpdateModelValue"
    @filter="filterFn"
  >
    <template
      #selected-item="selectedItem"
    >
      <div
        class="text-body1"
      >
        <q-avatar
          size="24px"
          :color="selectedItem.opt"
        />
        <span
          class="q-ml-sm"
        >
          {{ selectedItem.opt }}
        </span>
      </div>
    </template>
    <template
      #option="option"
    >
      <div
        class="text-body1 q-pa-sm cursor-pointer c-color-picker--option"
        :class="{
          'bg-grey-3': option.focused
        }"
        @click="option.toggleOption(option.opt)"
      >
        <q-avatar
          size="24px"
          :color="option.opt"
        />
        <span
          class="q-ml-sm"
          :class="{
            'text-primary': option.selected
          }"
        >
          {{ option.opt }}
        </span>
      </div>
    </template>
  </q-select>
</template>
<script lang="ts">
export default {
  name: 'CColorPicker',
}
</script>
<script setup lang="ts">
import { useQuasar, ValidationRule } from 'quasar'
import { qColorList } from '@/components/commons/forms/ColorPicker/colors'
import { defineEmits, defineProps, PropType, ref } from 'vue'
import { types } from 'sass'

const options = ref(qColorList)

const props = defineProps({
  modelValue: {
    type: [Object, Array, String],
    required: false,
    default: () => {},
  },
  dense: {
    type: Boolean,
    required: false,
    default: false,
  },
  outlined: {
    type: Boolean,
    required: false,
    default: false,
  },
  filled: {
    type: Boolean,
    required: false,
    default: false,
  },
  useChips: {
    type: Boolean,
    required: false,
    default: false,
  },
  stackLabel: {
    type: Boolean,
    required: false,
    default: false,
  },
  multiple: {
    type: Boolean,
    required: false,
    default: false,
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
  rules: {
    type: Array as PropType<ValidationRule<any>[]>,
    required: false,
    default: () => [],
  },
  placeholder: {
    type: String,
    required: false,
    default: null,
  }
})
const emits = defineEmits(['update:modelValue'])

const $q = useQuasar()

const onUpdateModelValue = (value: any | any[]) => {
  emits('update:modelValue', value)
}

const filterFn = (val: any, update: any) => {
  update(() => {
    const needle = val.toLowerCase()
    options.value = qColorList.filter(v => v.toLowerCase().indexOf(needle) > -1)
  })
}
</script>
<style
  lang="scss"
  scoped
>
.c-color-picker {
  &--option {
    &:hover {
      background-color: #eeeeee;
    }
  }
}
</style>
