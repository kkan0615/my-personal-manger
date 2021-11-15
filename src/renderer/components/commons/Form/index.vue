<template>
  <form
    class="tw-flex tw-flex-col tw-space-y-2"
    @keydown.enter.stop.prevent=""
  >
    <slot />
  </form>
</template>

<script lang="ts">
import { ref, defineComponent, provide } from 'vue'
import BBaseInput from '@/components/commons/inputs/Base/index.vue'
import { BFormProvideKey } from '@/components/commons/Form/types'

export default defineComponent({
  name: 'CForm',
  setup: () => {
    const fieldComponents = ref<Array<InstanceType<typeof BBaseInput>>>([])

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
          const result = component.inputValidate()
          if (!result || typeof result === 'string') {
            valid = false
          }
        }
      }
      return valid
    }
    return {
      checkValidation
    }
  }
})
</script>
