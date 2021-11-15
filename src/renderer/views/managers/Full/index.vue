<template>
  <div
    class="tw-relative"
  >
    <full-manager-manager />
    <div
      v-if="message"
      class="speech-bubble-container"
    >
      <div
        class="speech-bubble"
      >
        <span>
          {{ message }}
        </span>
      </div>
    </div>
  </div>
</template>
<script
  lang="ts"
>
export default {
  name: 'FullManager',
}
</script>
<script setup lang="ts">
import { computed, onMounted } from 'vue'
import useStore from '@/store'
import { useRoute } from 'vue-router'
import { ManagerActionTypes } from '@/store/modules/model/manager/actions'
import FullManagerManager from '@/views/managers/Full/components/Manager.vue'

const store = useStore()
const route = useRoute()
const message = computed(() => store.state.manager.message)

onMounted(async () => {
  document.body.classList.add('tw-w-72')
  await store.dispatch(ManagerActionTypes.HELLO_MANAGER)
})

</script>
<style
  scoped
  lang="scss"
>
  .speech-bubble-container {
    @apply
      tw-absolute
      tw-top-3/4
      tw-w-full
      tw-text-center
      tw-bg-white
      tw-rounded
      tw-shadow-xl
      tw-p-1
  }

  .speech-bubble {
    @apply
    tw-border
    tw-border-pink-500
    tw-border-dotted
    tw-rounded
    tw-shadow-xl
    tw-px-2
    tw-py-1;
  }
</style>
