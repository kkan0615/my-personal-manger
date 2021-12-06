<template>
  <div>
    <div>
      Hello {{ user.name }}!
    </div>
    <c-row-display
      class="tw-space-x-3"
    >
      <c-card
        class="tw-w-1/2 hover:tw-bg-gray-500"
        @click="onClickMoveToScheduleCard"
      >
        Schedule
      </c-card>
      <c-card
        class="tw-w-1/2 hover:tw-bg-gray-500"
        @click="onClickMoveToMangerCard"
      >
        Manager
      </c-card>
    </c-row-display>
    <div
      class="tw-flex tw-items-center tw-space-x-3"
    >
      <c-button
        class="btn-primary"
        @click="onClickOpenMangerBtn"
      >
        Open Manager
      </c-button>
      <c-button
        class="btn-danger"
        @click="onClickCloseManagerBtn"
      >
        Close Manager
      </c-button>
    </div>
  </div>
</template>
<script
  lang="ts"
>
export default {
  name: 'HomeGeneral',
}
</script>
<script setup lang="ts">
import useStore from '@/store'
import { computed, } from 'vue'
import { ManagerActionTypes } from '@/store/modules/model/manager/actions'
import CButton from '@/components/commons/Button/index.vue'
import { useRouter } from 'vue-router'
import CRowDisplay from '@/components/commons/displays/Row/index.vue'
import CCard from '@/components/commons/Card/index.vue'

const store = useStore()
const router = useRouter()

const user = computed(() => store.state.current.user)

const onClickMoveToScheduleCard = async () => {
  try {
    await router.push({ name: 'BaseSchedule' })
  } catch (e) {
    console.error(e)
  }
}

const onClickMoveToMangerCard = async () => {
  try {
    await router.push({ name: 'BaseManager' })
  } catch (e) {
    console.error(e)
  }
}

const onClickOpenMangerBtn = async () => {
  await store.dispatch(ManagerActionTypes.OPEN_MANAGER_WINDOW)
}

const onClickCloseManagerBtn = async () => {
  await store.dispatch(ManagerActionTypes.CLOSE_MANAGER_WINDOW)
}

</script>
