<template>
  <div>
    <c-header-layout
      class="tw-flex-grow-0 tw-flex-shrink"
      :title="$t('router.BaseSchedule')"
      :breadcrumbs="breadcrumbs"
    />
    <div
      class="tw-flex tw-justify-end"
    >
      <base-schedule-create-dialog />
      <base-schedule-filter />
    </div>
    <div
      class="tw-flex"
    >
      <div
        :class="{
          'tw-w-full': route.name === 'BaseSchedule',
          'tw-w-9/12': route.name === 'DetailSchedule'
        }"
      >
        <div>
          {{ route.name }}
        </div>
        <div>
          <base-schedule-schedule-item />
        </div>
        <div
          v-if="route.name === 'DetailSchedule'"
          class="tw-text-red-500"
        >
          <router-link :to="{ name: 'BaseSchedule' }">
            BaseSchedule
          </router-link>
        </div>
        <div
          class="tw-text-red-500"
        >
          <router-link :to="{ name: 'DetailSchedule', params: { id: 'test' } }">
            test
          </router-link>
        </div>
      </div>
      <div
        v-if="route.name ==='DetailSchedule'"
        class="tw-w-3/12"
      >
        right
      </div>
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
import { onMounted } from 'vue'
import { ScheduleActionTypes } from '@/store/modules/model/schedule/actions'
import BaseScheduleScheduleItem from '@/views/generals/schedules/Base/components/ScheduleItem.vue'

const i18n = useI18n()
const store = useStore()
const router = useRouter()
const route = useRoute()

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

onMounted(async () => {
  try {
    await store.dispatch(ScheduleActionTypes.LOAD_SCHEDULE_LIST)
  } catch (e) {
    console.error(e)
  }
})

const onClickCreateBtn = async () => {
  try {
    await router.push({ name: 'FormSchedule' })
  } catch (e) {
    console.error(e)
  }
}

</script>
