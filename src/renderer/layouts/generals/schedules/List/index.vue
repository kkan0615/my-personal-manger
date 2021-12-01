<template>
  <div>
    <div
      class="tw-text-right"
    >
      <c-button
        class="btn-success tw-mr-2"
        @click="onClickCreateBtn"
      >
        {{ $t('commons.Actions.create') }}
      </c-button>
      <base-schedule-filter />
    </div>
    <div>
      <slot />
    </div>
  </div>
</template>
<script lang="ts">
export default {
  name: 'ListScheduleGeneralLayout',
}
</script>
<script setup lang="ts">
import BaseScheduleFilter from '@/views/generals/schedules/Base/components/Filter.vue'
import { useI18n } from 'vue-i18n'
import useStore from '@/store'
import CButton from '@/components/commons/Button/index.vue'
import { useRouter } from 'vue-router'

const i18n = useI18n()
const store = useStore()
const router = useRouter()

const onClickCreateBtn = async () => {
  try {
    await router.push({ name: 'FormSchedule' })
  } catch (e) {
    console.error(e)
  }
}

</script>
