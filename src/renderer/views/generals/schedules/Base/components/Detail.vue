<template>
  <div>
    Prototype
  </div>
</template>
<script lang="ts">
export default {
  name: 'BaseScheduleDetail',
}
</script>
<script setup lang="ts">
import { onMounted } from 'vue'
import useStore from '@/store'
import { useRoute, useRouter } from 'vue-router'
import { ScheduleActionTypes } from '@/store/modules/model/schedule/actions'

const store = useStore()
const router = useRouter()
const route = useRoute()

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
