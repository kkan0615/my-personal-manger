<template>
  <div>
    <div
      class="tw-text-2xl tw-flex tw-items-center tw-p-3"
    >
      <div>
        {{ schedule.title }}
      </div>
      <div
        class="tw-ml-auto tw-space-x-1"
      >
        <button>
          <base-schedule-update-dialog
            :schedule="schedule"
          />
        </button>
        <button
          @click="onClickDeleteBtn"
        >
          <c-material-icon
            class="tw-text-red-500"
          >
            delete
          </c-material-icon>
        </button>
        <button
          @click="onClickCloseBtn"
        >
          <c-material-icon>
            close
          </c-material-icon>
        </button>
      </div>
    </div>
    <hr>
    <div
      class="tw-p-3"
    >
      <!-- Date -->
      <c-row-display>
        <c-row-display-label>
          Date
        </c-row-display-label>
        <c-row-display-content>
          {{ scheduleDate }}
        </c-row-display-content>
      </c-row-display>
      <!-- content -->
      <c-row-display>
        <c-row-display-label>
          Content
        </c-row-display-label>
        <c-row-display-content>
          {{ schedule.content }}
        </c-row-display-content>
      </c-row-display>
      <!-- Date -->
      <c-row-display>
        <c-row-display-label>
          Created At
        </c-row-display-label>
        <c-row-display-content>
          {{ createdAt }}
        </c-row-display-content>
      </c-row-display>
      <!-- Date -->
      <c-row-display>
        <c-row-display-label>
          Updated AT
        </c-row-display-label>
        <c-row-display-content>
          {{ scheduleDate }}
        </c-row-display-content>
      </c-row-display>
    </div>
  </div>
</template>
<script lang="ts">
export default {
  name: 'BaseScheduleDetail',
}
</script>
<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted } from 'vue'
import useStore from '@/store'
import { useRoute, useRouter } from 'vue-router'
import { ScheduleActionTypes } from '@/store/modules/model/schedule/actions'
import dayjs from 'dayjs'
import CRowDisplay from '@/components/commons/displays/Row/index.vue'
import CRowDisplayLabel from '@/components/commons/displays/Row/components/Label.vue'
import CRowDisplayContent from '@/components/commons/displays/Row/components/Content.vue'
import CMaterialIcon from '@/components/commons/icons/Material/index.vue'
import BaseScheduleUpdateDialog from '@/views/generals/schedules/Base/components/UpdateDialog.vue'
import { useI18n } from 'vue-i18n'
import useToast from '@/mixins/useToast'

const store = useStore()
const router = useRouter()
const route = useRoute()
const i18n = useI18n()
const { showToast } = useToast()

const schedule = computed(() => store.state.schedule.schedule)
const createdAt = computed(() => dayjs(schedule.value.createdAt).format('ll'))
const updatedAt = computed(() => dayjs(schedule.value.updatedAt).format('ll'))
const scheduleDate = computed(() => schedule.value.date ? dayjs(schedule.value.date).format('llll') : '')

onMounted(async () => {
  try {
    const { id } = route.params
    if (id) {
      /* Load schedule */
      await store.dispatch(ScheduleActionTypes.LOAD_SCHEDULE, id as string)
    } else {
      await router.push({ name: 'Home' })
    }
  } catch (e) {
    console.error(e)
    await router.push({ name: 'Home' })
  }
})

onBeforeUnmount(() => {
  store.dispatch(ScheduleActionTypes.RESET_SCHEDULE)
})

const onClickDeleteBtn = async () => {
  try {
    await store.dispatch(ScheduleActionTypes.DELETE_SCHEDULE, schedule.value.id)
    await store.dispatch(ScheduleActionTypes.LOAD_SCHEDULE_LIST)
    await router.push({ name: 'BaseSchedule' })
    showToast({
      title: 'Success',
      content: 'Success to delete',
      type: 'success'
    })
  } catch (e) {
    console.error(e)
    showToast({
      title: 'Fail',
      content: 'Fail to delete',
      type: 'danger'
    })
  }
}

const onClickCloseBtn = async () => {
  try {
    await router.push({ name: 'BaseSchedule' })
  } catch (e) {
    console.error(e)
  }
}
</script>
