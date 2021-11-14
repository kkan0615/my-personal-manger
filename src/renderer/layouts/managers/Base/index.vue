<template>
  <router-view />
</template>
<script
    lang="ts"
>
export default {
  name: 'BaseManagerLayout',
}
</script>
<script setup lang="ts">
import { computed } from 'vue'
import useStore from '@/store'
import { useRouter } from 'vue-router'

const store = useStore()
const router = useRouter()

const managerConfig = computed(() => store.state.manager.config)

/* Move to specific place */
if (managerConfig.value.displayStyle === 'CIRCLE') {
  router.push({ name: 'CircleManager' })
} else {
  router.push({ name: 'FullManager' })
}

</script>
