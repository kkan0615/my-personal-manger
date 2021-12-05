<template>
  <div>
    {{ schedule }}
    <div
      class="tw-text-2xl tw-flex tw-items-center"
    >
      {{ schedule.title }}
      <div
        class="tw-ml-auto tw-space-x-1"
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
        <button>
          <c-material-icon>
            close
          </c-material-icon>
        </button>
      </div>
    </div>
    <!-- Date -->
    <c-row-display>
      <c-row-display-label>
        Date
      </c-row-display-label>
      <c-row-display-content>
        {{ scheduleDate }}
      </c-row-display-content>
    </c-row-display>
    <div>
      <div>
        Content
      </div>
      <div>
        {{ schedule.content }}
      </div>
    </div>
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
</template>
<script lang="ts">
export default {
  name: 'BaseScheduleDetail',
}
</script>
<script setup lang="ts">
import { computed, onMounted } from 'vue'
import useStore from '@/store'
import { useRoute, useRouter } from 'vue-router'
import { ScheduleActionTypes } from '@/store/modules/model/schedule/actions'
import dayjs from 'dayjs'
import CRowDisplay from '@/components/commons/displays/Row/index.vue'
import CRowDisplayLabel from '@/components/commons/displays/Row/components/Label.vue'
import CRowDisplayContent from '@/components/commons/displays/Row/components/Content.vue'
import CMaterialIcon from '@/components/commons/icons/Material/index.vue'

const store = useStore()
const router = useRouter()
const route = useRoute()

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
</script>
