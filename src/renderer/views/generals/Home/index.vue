<template>
  <div>
    <div
      class="tw-text-2xl"
    >
      Home {{ $t('message.hello') }}
    </div>
    <div>
      store data: [ {{ test }} ]
    </div>
    <div>
      <button
        class="btn btn-primary"
        type="button"
        @click="onClickTestBtn"
      >
        test
      </button>
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
      @click="onClickCloseManagerBtn"
    >
      close the manger
    </button>
    <button
      class="btn btn-primary"
      type="button"
      @click="onClickTryToChangeBtn"
    >
      change test data
    </button>
    <button
      class="btn btn-primary"
      type="button"
      @click="onClickToOverlayManagerBtn"
    >
      move to overlay manager
    </button>
    <div>
      {{ user }}
    </div>
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
import { closeManagerWindow, openManagerWindow } from '@/utils/electrons/ipc'
import useStore from '@/store'
import { computed, onBeforeMount } from 'vue'
import { PrototypeActionTypes } from '@/store/modules/systems/prototype/actions'
import { useRouter } from 'vue-router'
import { Manager } from '@main/types/models/Manager'
import { ManagerConfig } from '@main/types/models/Manager/config'
import useElectron from '@/mixins/useElectron'
import { ApplicationActionTypes } from '@/store/modules/systems/application/actions'
import { Snackbar } from '@/types/applications/Snackbar'

const { ipcRenderer } = useElectron()
const store = useStore()
const router = useRouter()

const test = computed(() => store.state.prototype.test)
const user = computed(() => store.state.current.user)

const onClickTestBtn = async () => {
  await store.dispatch(ApplicationActionTypes.ADD_SNACKBAR_TO_LIST, {
    title: 'test title',
    content: 'test content',
    type: 'danger',
  } as Snackbar)
}

const onClickOpenMangerBtn = () => {
  openManagerWindow()
}

const onClickCloseManagerBtn = () => {
  closeManagerWindow()
}

const onClickTryToChangeBtn = async () => {
  // await store.dispatch(PrototypeActionTypes.ADD_TEST, 'changed from home')
}

const onClickToOverlayManagerBtn = async () => {
  await router.push({ name: 'FullManager' })
}

</script>
