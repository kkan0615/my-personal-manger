<template>
  <div
    class="tw-flex tw-items-center tw-w-full tw-border tw-rounded tw-p-3"
  >
    <div
      class="tw-w-6/12 tw-flex tw-items-center"
    >
      <div
        class="badge tw-mr-2"
        :class="{
          'tw-bg-bs-primary': schedule.jobName,
          'tw-bg-red-500': !schedule.jobName,
        }"
      >
        {{ schedule.jobName ? 'saved' : 'done' }}
      </div>
      <div>
        {{ schedule.title }}
      </div>
    </div>
    <div
      class="tw-mx-auto tw-w-4/12"
    >
      {{ date }}
    </div>
    <div
      class="tw-w-2/12 tw-flex tw-items-center tw-space-x-2"
    >
      <base-schedule-update-dialog
        v-if="schedule.jobName"
        :schedule="schedule"
      />
      <button
        v-if="schedule.jobName"
        @click="onClickDeleteBtn"
      >
        <c-material-icon
          class="tw-text-red-500"
        >
          delete
        </c-material-icon>
      </button>
      <button
        @click="onClickInfoBtn"
      >
        <c-material-icon
          class="tw-text-bs-primary"
        >
          info
        </c-material-icon>
      </button>
    </div>
  </div>
</template>
<script lang="ts">
export default {
  name: 'BaseScheduleScheduleItem',
}
</script>
<script setup lang="ts">
import { computed, defineProps, PropType } from 'vue'
import dayjs from 'dayjs'
import CMaterialIcon from '@/components/commons/icons/Material/index.vue'
import { ScheduleInfo } from '@/types/models/Schedule'
import { useRouter } from 'vue-router'
import useStore from '@/store'
import { ScheduleActionTypes } from '@/store/modules/model/schedule/actions'
import BaseScheduleUpdateDialog from '@/views/generals/schedules/Base/components/UpdateDialog.vue'

const props = defineProps({
  schedule: {
    type: Object as PropType<ScheduleInfo>,
    required: false, // @TODO: CHANGE TO TRUE
    default: () => {}
  }
})

const router = useRouter()
const store = useStore()

const date = computed(() => (props.schedule && props.schedule.date ?
  dayjs(props.schedule?.date).format('llll') : ''))

const onClickDeleteBtn = async () => {
  try {
    if (props.schedule) {
      await store.dispatch(ScheduleActionTypes.DELETE_SCHEDULE, props.schedule.id)
      /* Reload list */
      await store.dispatch(ScheduleActionTypes.LOAD_SCHEDULE_LIST)
    }
  } catch (e) {
    console.error(e)
  }
}

const onClickInfoBtn = async () => {
  try {
    if (props.schedule) {
      await router.push({ name: 'DetailSchedule', params: { id: props.schedule.id } })
    }
  } catch (e) {
    console.error(e)
  }
}
</script>
