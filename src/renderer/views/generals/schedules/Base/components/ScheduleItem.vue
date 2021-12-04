<template>
  <div
    class="tw-flex tw-items-center tw-w-full tw-border tw-rounded tw-p-3"
  >
    <div
      class="badge tw-bg-bs-primary"
    >
      saved
    </div>
    <div
      class="tw-mx-auto"
    >
      {{ schedule.title }}
    </div>
    <div
      class="tw-mx-auto"
    >
      {{ date }}
    </div>
    <div
      class="tw-ml-auto tw-flex tw-items-center tw-space-x-2"
    >
      <button>
        <c-material-icon
          class="tw-text-bs-primary"
        >
          edit
        </c-material-icon>
      </button>
      <button>
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
import { Schedule } from '@/types/models/Schedule'
import { useRouter } from 'vue-router'

const props = defineProps({
  schedule: {
    type: Object as PropType<Schedule>,
    required: false, // @TODO: CHANGE TO TRUE
    default: () => {}
  }
})

const router = useRouter()

const date = computed(() => (props.schedule && props.schedule.date ?
  dayjs(props.schedule?.date).format('llll') : ''))

const onClickInfoBtn = async () => {
  try {
    if (props.schedule)
      await router.push({ name: 'DetailSchedule', params: { id: props.schedule.id } })
  } catch (e) {
    console.error(e)
  }
}
</script>
