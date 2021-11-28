<template>
  <form
    @keydown.enter.stop.prevent=""
  >
    <slot />
  </form>
</template>

<script lang="ts">
export default {
  name: 'CForm',
}
</script>
<script setup lang="ts">
import { ref, provide } from 'vue'
import BBaseInput from '@/components/commons/inputs/Base/index.vue'
import { BFormProvideKey } from '@/components/commons/Form/types'

const fieldComponents = ref<Array<InstanceType<typeof BBaseInput> | any>>([])

const register = (component: InstanceType<typeof BBaseInput>) => {
  fieldComponents.value.push(component)
}
const unregister = (uid: number) => {
  const index = fieldComponents.value.findIndex(c => (c as any).uid === uid)
  if (index > -1) {
    fieldComponents.value.splice(index, 1)
  }
}

provide(BFormProvideKey, {
  register,
  unregister,
})

const checkValidation = () => {
  let valid = true
  if (fieldComponents.value && fieldComponents.value.length) {
    for (const component of fieldComponents.value) {
      if (component.inputValidate) {
        console.log(component)
        const result = component.inputValidate()
        if (!result || typeof result === 'string') {
          valid = false
        }
      }
    }
  }
  return valid
}
</script>
