<template>
  <div
    class="tw-h-full tw-flex tw-flex-col"
  >
    <div
      class="tw-flex-grow-0 tw-flex-shrink"
    >
      <div
        class="tw-flex tw-items-center"
      >
        <div>
          Hello {{ user.name }}!
        </div>
        <div
          class="tw-ml-auto tw-space-x-3"
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
    </div>
    <c-row-display
      class="tw-space-x-3 tw-flex-grow tw-flex-shrink-0"
    >
      <c-card
        class="tw-w-1/2 hover:tw-bg-gray-300 hover:tw-shadow-2xl tw-h-1/2 tw-flex tw-justify-center tw-items-center tw-cursor-pointer"
        @click="onClickMoveToScheduleCard"
      >
        <div
          class="tw-text-3xl tw-text-center"
        >
          <c-material-icon
            class="tw-text-7xl"
          >
            date_range
          </c-material-icon>
          <div>
            Schedule
          </div>
        </div>
      </c-card>
      <c-card
        class="tw-w-1/2 hover:tw-bg-gray-300 tw-h-1/2 hover:tw-shadow-2xl tw-flex tw-justify-center tw-items-center tw-cursor-pointer"
        @click="onClickMoveToMangerCard"
      >
        <div
          class="tw-text-3xl tw-text-center"
        >
          <c-material-icon
            class="tw-text-7xl"
          >
            support_agent
          </c-material-icon>
          <div>
            Manager
          </div>
        </div>
      </c-card>
    </c-row-display>
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
import CMaterialIcon from '@/components/commons/icons/Material/index.vue'

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

const onClickOpenMangerBtn = () => {
  store.dispatch(ManagerActionTypes.OPEN_MANAGER_WINDOW)
}

const onClickCloseManagerBtn = () => {
  store.dispatch(ManagerActionTypes.CLOSE_MANAGER_WINDOW)
}

</script>
