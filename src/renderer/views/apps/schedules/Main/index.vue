<template>
  <q-page
    padding
  >
    <c-layout-menubar
      :tittle="$route.name"
    />
    <div
      class="row q-mb-sm justify-end"
    >
      <q-btn
        class="q-mr-sm"
        round
        size="sm"
        color="primary"
        icon="refresh"
      >
        <q-tooltip>
          refresh the table
        </q-tooltip>
      </q-btn>
      <app-schedule-main-schedule-form-dialog />
    </div>
    <q-table
      style="height: 85vh"
      :rows="dataRows"
      :columns="columns"
      :visible-columns="visibleColumns"
      row-key="name"
      separator="cell"
      table-header-class="bg-primary text-white"
      dense
    >
      <template
        #body-cell-action="props"
      >
        <q-td :props="props">
          <q-btn
            flat
            round
            size="sm"
            color="negative"
            icon="delete"
            @click="onClickDeleteBtn(props)"
          >
            <q-tooltip>
              Delete schedule
            </q-tooltip>
          </q-btn>
        </q-td>
      </template>
      <template
        #top
      >
        <div
          class="row items-center full-width"
        >
          <div>
            Schedule list
          </div>
          <q-toggle
            v-model="isIncludeDelete"
            class="q-ml-auto"
            label="Display Deleted"
            color="pink"
          />
        </div>
      </template>
    </q-table>
  </q-page>
</template>
<script lang="ts">
export default {
  name: 'AppScheduleMain',
}
</script>
<script setup lang="ts">
import { computed, onBeforeMount, onBeforeUnmount, ref } from 'vue'
import CLayoutMenubar from '@/components/commons/layouts/Menubar/index.vue'
import { useScheduleStore } from '@/stores/schedule'
import dayjs from 'dayjs'
import AppScheduleMainScheduleFormDialog from '@/views/apps/schedules/Main/components/ScheduleFormDialog.vue'
import { Schedule } from '@/types/schedules'

const scheduleStore = useScheduleStore()

const isTableLoading = ref(false)
const columns = ref([
  {
    name: 'name',
    label: 'Key',
    field: 'name',
  },
  {
    name: 'date',
    label: 'date',
    field: 'date',
    align: 'left',
  },
  {
    name: 'content',
    label: 'content',
    field: 'content',
    align: 'left',
  },
  {
    name: 'action',
    label: 'action',
    field: 'action',
    align: 'center',
  },
])
const visibleColumns = ref(['date', 'content', 'action'])
const isIncludeDelete = ref(false)

const dataRows = computed(() => {
  let scheduleList: Schedule[] = scheduleStore.ScheduleList
  console.log('test', isIncludeDelete.value)
  if (!isIncludeDelete.value) {
    scheduleList = scheduleList.filter(schedule => !schedule.deletedAt)
  }
  return scheduleList.map(schedule => {
    let date = ''
    if (schedule.isLoop) {
      const splitDate = schedule.date.toString().split(' ')
      date += 'Every '
      switch (parseInt(splitDate[5])) {
        case 0:
          date += 'Sunday'
          break
        case 1:
          date += 'Monday'
          break
        case 2:
          date += 'Tuesday'
          break
        case 3:
          date += 'Wednesday'
          break
        case 4:
          date += 'Thursday'
          break
        case 5:
          date += 'Friday'
          break
        case 6:
          date += 'Saturday'
          break
      }

      date += ` ${splitDate[2].toString().padStart(2, '0')}:${splitDate[1].toString().padStart(2, '0')}:${splitDate[0].toString().padStart(2, '0')}`
    } else {
      if (!schedule.deletedAt)
        date = dayjs(schedule.date).fromNow()
      else {
        date = dayjs(schedule.date).format('lll')
      }
    }

    return {
      name: schedule.name,
      isLoop: schedule.isLoop,
      content: schedule.content,
      date,
    }
  })
})

/* Load schedule list */
onBeforeMount(async () => {
  await initPage()
})

onBeforeUnmount(() => {
  scheduleStore.resetScheduleList()
})

const initPage = async () => {
  try {
    await scheduleStore.loadScheduleList()
  } catch (e) {
    console.error(e)
  }
}

const onClickDeleteBtn = async (props: any) => {
  if (confirm('Would you like to delete?')) {
    try {
      await scheduleStore.deleteSchedulePermanently(props.key)
      alert('success to delete')
      await initPage()
    } catch (e) {
      console.error(e)
    }
  }
}
</script>
