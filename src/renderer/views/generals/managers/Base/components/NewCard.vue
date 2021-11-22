<template>
  <c-card
    class="tw-h-48 tw-flex tw-justify-center tw-items-center tw-border-4 tw-border-gray-500 tw-border-dashed tw-shadow-none hover:tw-bg-gray-400 tw-cursor-pointer"
    @click="onClickNewCard"
  >
    <div
      class="tw-w-1/4 tw-h-1/4 tw-flex tw-justify-center tw-items-center tw-cursor-pointer tw-rounded-full"
    >
      <c-material-icon
        class="tw-text-gray-500"
      >
        add
      </c-material-icon>
    </div>
  </c-card>
</template>
<script lang="ts">
export default {
  name: 'BaseMangerNewCard',
}
</script>
<script setup lang="ts">
import CCard from '@/components/commons/Card/index.vue'
import CMaterialIcon from '@/components/commons/icons/Material/index.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const onClickNewCard = async () => {
  try {
    await router.push({ name: 'FormManager' })
  } catch (e) {
    console.error(e)
  }
}
</script>
