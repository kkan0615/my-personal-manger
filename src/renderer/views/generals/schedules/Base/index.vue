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
          <c-button
            class="btn-danger"
            @click="onClickClearDoneListBtn"
          >
            {{ $t('Types.Models.Schedule.Actions.clearDoneList') }}
          </c-button>
          <div
            class="tw-ml-auto tw-space-x-2"
          >
            <base-schedule-filter-dialog />
            <base-schedule-create-dialog />
          </div>
        </div>
        <!-- Schedule list -->
        <div>
          <div>
            <div
              class="tw-flex tw-items-center tw-mb-2"
            >
              <div
                class="tw-w-6/12"
              >
                {{ $t('Types.Models.Schedule.title') }}
              </div>
              <div
                class="tw-w-4/12"
              >
                {{ $t('Types.Models.Schedule.date') }}
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
      <!-- Schedule detail, if it's detail page -->
      <c-card
        v-if="route.name === 'DetailSchedule'"
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
import CHeaderLayout from '@/components/commons/layouts/Header/index.vue'
import CCard from '@/components/commons/Card/index.vue'
import BaseScheduleCreateDialog from '@/views/generals/schedules/Base/components/CreateDialog.vue'
import BaseScheduleFilterDialog from '@/views/generals/schedules/Base/components/FilterDialog.vue'
import BaseScheduleScheduleItem from '@/views/generals/schedules/Base/components/ScheduleItem.vue'
import BaseScheduleDetail from '@/views/generals/schedules/Base/components/Detail.vue'
import useStore from '@/store'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import { CBreadcrumb } from '@/types/libs/components/breadcrumb'
import { computed, onBeforeUnmount, onMounted } from 'vue'
import { ScheduleActionTypes } from '@/store/modules/model/schedule/actions'
import CButton from '@/components/commons/Button/index.vue'
import useToast from '@/mixins/useToast'

const i18n = useI18n()
const store = useStore()
const route = useRoute()
const { showToast } = useToast()

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

onBeforeUnmount(async () => {
  try {
    await store.dispatch(ScheduleActionTypes.RESET_SCHEDULE_LIST_OPTION)
  } catch (e) {
    console.error(e)
  }
})

const onClickClearDoneListBtn = async () => {
  try {
    await store.dispatch(ScheduleActionTypes.CLEAR_DONE_SCHEDULE_LIST)
    await store.dispatch(ScheduleActionTypes.LOAD_SCHEDULE_LIST)
    showToast({
      title: 'Success',
      content: 'Success to change',
      type: 'success'
    })
  } catch (e) {
    console.error(e)
    showToast({
      title: 'Fail',
      content: 'Fail',
      type: 'danger'
    })
  }
}
</script>
