<template>
  <div>
    <div
      class="tw-text-2xl"
    >
      Home
    </div>
    <div>
      store data: [ {{ test }} ]
    </div>
    <button
      class="btn btn-primary"
      type="button"
      @click="onClickOpenMangerBtn"
    >
      open the manager
    </button>
    <button
      class="btn btn-primary"
      type="button"
      @click="onClickTryToChangeBtn"
    >
      change test data
    </button>
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
import { openManagerWindow } from '@/utils/electrons/ipc'
import useStore from '@/store'
import { computed, onBeforeMount } from 'vue'
import { PrototypeActionTypes } from '@/store/modules/systems/prototype/actions'

const store = useStore()

const test = computed(() => store.state.prototype.test)

onBeforeMount(async () => {
  await store.dispatch(PrototypeActionTypes.ADD_TEST, 'Arrived at home')
})

const onClickOpenMangerBtn = () => {
  openManagerWindow()
}

const onClickTryToChangeBtn = async () => {
  await store.dispatch(PrototypeActionTypes.ADD_TEST, 'changed from home')

}

</script>
