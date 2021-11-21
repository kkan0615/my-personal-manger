<template>
  <c-appbar-layout
    :height="12"
    class="tw-flex-shrink-0 tw-flex-grow-0 tw-border-b tw-bg-white"
  >
    <div
      class="tw-flex tw-space-x-1"
    >
      <c-button
        class="btn-sm p-0"
        @click="onClickArrowBackBtn"
      >
        <c-material-icon>
          arrow_back
        </c-material-icon>
      </c-button>
      <c-button
        class="btn-sm p-0"
        @click="onClickArrowForwardBtn"
      >
        <c-material-icon>
          arrow_forward
        </c-material-icon>
      </c-button>
    </div>
  </c-appbar-layout>
</template>
<script lang="ts">
export default {
  name: 'BaseGeneralLayoutAppbar',
}
</script>
<script setup lang="ts">
import CAppbarLayout from '@/components/commons/layouts/Appbar/index.vue'
import CButton from '@/components/commons/Button/index.vue'
import CMaterialIcon from '@/components/commons/icons/Material/index.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const onClickArrowBackBtn = async () => {
  router.back()
}

const onClickArrowForwardBtn = async () => {
  router.forward()
}
</script>
