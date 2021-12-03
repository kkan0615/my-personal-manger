<template>
  <div
    class="tw-flex tw-items-center tw-w-full tw-border tw-rounded tw-p-3"
  >
    <div
      class="badge tw-bg-bs-primary"
    >
      saved
    </div>
    <div>
      title
    </div>
    <div>
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
      <button>
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
import { computed, defineProps } from 'vue'
import dayjs from 'dayjs'
import CMaterialIcon from '@/components/commons/icons/Material/index.vue'

const props = defineProps({
  schedule: {
    type: Object,
    required: false, // @TODO: CHANGE TO TRUE
    default: () => {}
  }
})

const date = computed(() => dayjs().format('llll'))
</script>
