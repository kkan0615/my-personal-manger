<template>
  <div
    class="tw-h-full tw-flex tw-flex-col"
  >
    <c-header-layout
      class="tw-flex-grow-0 tw-flex-shrink"
      :title="$t('router.BaseSchedule')"
      :breadcrumbs="breadcrumbs"
    />
    <div
      class="tw-flex tw-h-full"
    >
      <div
        class="tw-mr-2"
        :class="{
          'tw-w-full': route.name === 'BaseSchedule',
          'tw-w-9/12': route.name === 'DetailSchedule'
        }"
      >
        <div
          class="tw-flex tw-mb-2"
        >
          <div
            class="btn-group"
            role="group"
            aria-label="Basic example"
          >
            <button
              type="button"
              class="btn"
              :class="{
                'btn-primary': displaySavedScheduleList,
                'btn-outline-primary': !displaySavedScheduleList,
              }"
              @click="onClickSavedListBtn"
            >
              Saved
            </button>
            <button
              type="button"
              class="btn "
              :class="{
                'btn-primary': displayDoneScheduleList,
                'btn-outline-primary': !displayDoneScheduleList,
              }"
              @click="onClickDoneListBtn"
            >
              Done
            </button>
          </div>
          <div
            class="tw-ml-auto"
          >
            <c-button
              class="btn-primary tw-mr-2"
              @click="onClickClearDoneListBtn"
            >
              Clear Done
            </c-button>
            <base-schedule-create-dialog />
            <base-schedule-filter />
          </div>
        </div>
        <div>
          <div>
            <div
              class="tw-flex tw-items-center tw-mb-2"
            >
              <div
                class="tw-w-6/12"
              >
                Title
              </div>
              <div
                class="tw-w-4/12"
              >
                Date
              </div>
              <div
                class="tw-w-2/12"
              >
                Actions
              </div>
            </div>
            <div
              class="tw-flex-col tw-space-y-2"
            >
              <base-schedule-schedule-item
                v-for="schedule in scheduleList"
                :key="schedule.id"
                :schedule="schedule"
              />
            </div>
          </div>
        </div>
      </div>
      <c-card
        v-if="route.name ==='DetailSchedule'"
        class="tw-w-3/12 tw-h-full tw-ml-2"
      >
        <base-schedule-detail />
      </c-card>
    </div>
  </div>
</template>
<script lang="ts">
export default {
  name: 'BaseSchedule',
}
</script>
<script setup lang="ts">
import BaseScheduleFilter from '@/views/generals/schedules/Base/components/Filter.vue'
import CHeaderLayout from '@/components/commons/layouts/Header/index.vue'
import BaseScheduleCreateDialog from '@/views/generals/schedules/Base/components/CreateDialog.vue'
import useStore from '@/store'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import { CBreadcrumb } from '@/types/libs/components/breadcrumb'
import { computed, onMounted, ref } from 'vue'
import { ScheduleActionTypes } from '@/store/modules/model/schedule/actions'
import BaseScheduleScheduleItem from '@/views/generals/schedules/Base/components/ScheduleItem.vue'
import useElectron from '@/mixins/useElectron'
import BaseScheduleDetail from '@/views/generals/schedules/Base/components/Detail.vue'
import CCard from '@/components/commons/Card/index.vue'
import CButton from '@/components/commons/Button/index.vue'

const i18n = useI18n()
const store = useStore()
const router = useRouter()
const route = useRoute()
const { ipcRenderer } = useElectron()

const displaySavedScheduleList = ref(true)
const displayDoneScheduleList = ref(false)

const breadcrumbs: Array<CBreadcrumb> = [
  {
    title: i18n.t('router.Home'),
    path: { name: 'Home' },
  },
  {
    title: i18n.t('router.BaseSchedule'),
    disabled: true,
  },
]

const scheduleList = computed(() => store.state.schedule.scheduleList)

onMounted(async () => {
  try {
    await store.dispatch(ScheduleActionTypes.LOAD_SCHEDULE_LIST)
  } catch (e) {
    console.error(e)
  }
})

const onClickSavedListBtn = async () => {
  try {
    displaySavedScheduleList.value = !displaySavedScheduleList.value
    await store.dispatch(ScheduleActionTypes.LOAD_SCHEDULE_LIST, {
      saved: displaySavedScheduleList.value,
      done: displayDoneScheduleList.value,
    } as any)
  } catch (e) {
    console.error(e)
  }
}

const onClickDoneListBtn = async () => {
  try {
    displayDoneScheduleList.value = !displayDoneScheduleList.value
    await store.dispatch(ScheduleActionTypes.LOAD_SCHEDULE_LIST, {
      saved: displaySavedScheduleList.value,
      done: displayDoneScheduleList.value,
    } as any)
  } catch (e) {
    console.error(e)
  }
}

const onClickClearDoneListBtn = async () => {
  try {
    await store.dispatch(ScheduleActionTypes.CLEAR_DONE_SCHEDULE_LIST)
    await store.dispatch(ScheduleActionTypes.LOAD_SCHEDULE_LIST, {
      saved: displaySavedScheduleList.value,
      done: displayDoneScheduleList.value,
    } as any)
  } catch (e) {
    console.error(e)
  }
}
</script>
