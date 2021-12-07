<template>
  <c-list
    class="manager-contextmenu"
    :style="{
      top: `${top}px`,
      left: `${left}px`,
    }"
    @click.stop.prevent="emits('close')"
  >
    <c-list-title>
      Menus
    </c-list-title>
    <c-list-item
      class="manager-contextmenu-item"
      @click="onClickTodaySchedules"
    >
      Today Schedules
    </c-list-item>
    <c-list-item
      class="manager-contextmenu-item"
      @click="onClickNextSchedule"
    >
      Next schedule
    </c-list-item>
  </c-list>
</template>
<script
    lang="ts"
>
export default {
  name: 'FullManagerManagerContextMenu',
}
</script>
<script setup lang="ts">
import useStore from '@/store'
import { useRoute } from 'vue-router'
import { defineEmits, defineProps } from 'vue'
import CList from '@/components/commons/List/index.vue'
import CListItem from '@/components/commons/List/components/Item.vue'
import CListTitle from '@/components/commons/List/components/Title.vue'
import { ScheduleActionTypes } from '@/store/modules/model/schedule/actions'
import { ManagerActionTypes } from '@/store/modules/model/manager/actions'

const props = defineProps({
  top: {
    type: Number,
    required: false,
    default: 0,
  },
  left: {
    type: Number,
    required: false,
    default: 0,
  },
})

const emits = defineEmits(['close'])

const store = useStore()
const route = useRoute()

const onClickTodaySchedules = async () => {
  try {
    await store.dispatch(ScheduleActionTypes.LOAD_SCHEDULE_LIST)
    await store.dispatch(ManagerActionTypes.SCHEDULE_COUNTS)
  } catch (e) {
    console.error(e)
  }
}

const onClickNextSchedule = async () => {
  try {
    await store.dispatch(ScheduleActionTypes.LOAD_SCHEDULE_LIST)
    await store.dispatch(ManagerActionTypes.NEXT_SCHEDULE)
  } catch (e) {
    console.error(e)
  }
}

</script>
<style
  scoped
  lang="scss"
>
.manager-contextmenu {
  @apply tw-absolute tw-bg-white tw-z-10 tw-w-40;
}

.manager-contextmenu-item {
  @apply tw-cursor-pointer;
}
</style>
