<template>
  <div>
    <img
      class="draggable"
      alt="Vue logo"
      src="@/assets/logo.png"
    >
    <p
      class="tw-bg-white"
    >
      store data: [ {{ test }} ]
    </p>
  </div>
</template>
<script
  lang="ts"
>
export default {
  name: 'PrototypeWithOutScriptSetup',
}
</script>
<script setup lang="ts">
import { computed, onBeforeMount } from 'vue'
import { PrototypeActionTypes } from '@/store/modules/systems/prototype/actions'
import { store } from '@/store'

const test = computed(() => store.state.prototype.test)

onBeforeMount(async () => {
  await store.dispatch(PrototypeActionTypes.ADD_TEST, 'Manager is sharing same thing!')
})
</script>
