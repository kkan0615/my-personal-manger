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
    <div>
      <div>
        {{ route.name }}
      </div>
      content
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
  </div>
</template>
<script lang="ts">
export default {
  name: 'BaseSchedule',
}
</script>
<script setup lang="ts">
import BaseScheduleFilter from '@/views/generals/schedules/Base/components/Filter.vue'
import { useI18n } from 'vue-i18n'
import useStore from '@/store'
import { useRoute, useRouter } from 'vue-router'
import CHeaderLayout from '@/components/commons/layouts/Header/index.vue'
import CButton from '@/components/commons/Button/index.vue'
import { CBreadcrumb } from '@/types/libs/components/breadcrumb'
import BaseScheduleCreateDialog from '@/views/generals/schedules/Base/components/CreateDialog.vue'

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

const onClickCreateBtn = async () => {
  try {
    await router.push({ name: 'FormSchedule' })
  } catch (e) {
    console.error(e)
  }
}

</script>
