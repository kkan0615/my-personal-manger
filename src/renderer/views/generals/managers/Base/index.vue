<template>
  <div
    class="tw-h-full tw-flex tw-flex-col"
  >
    <c-header-layout
      class="tw-flex-grow-0 tw-flex-shrink"
      :title="$t(`router.${$route.name}`)"
      :breadcrumbs="breadcrumbs"
    />
    <div
      class="tw-flex tw-flex-grow tw-flex-shrink-0"
    >
      <c-card
        class="tw-bg-white tw-p-2"
      >
        <!-- full manager -->
        <div
          class="tw-mb-4"
        >
          <div
            class="tw-mb-2 tw-text-lg tw-font-semibold"
          >
            Full Manager
          </div>
          <div
            class="tw-flex"
          >
            <base-manger-full-manager />
          </div>
        </div>
        <!-- Circle manager -->
        <div>
          <div
            class="tw-mb-2 tw-text-lg tw-font-semibold"
          >
            Circle Manager
          </div>
          <div>
            <base-manger-circle-manager />
          </div>
        </div>
      </c-card>
    </div>
  </div>
</template>
<script
    lang="ts"
>
export default {
  name: 'BaseMangerGeneral',
}
</script>
<script setup lang="ts">
import CHeaderLayout from '@/components/commons/layouts/Header/index.vue'
import { CBreadcrumb } from '@/types/libs/components/breadcrumb'
import { useI18n } from 'vue-i18n'
import BaseMangerFullManager from '@/views/generals/managers/Base/components/FullManager.vue'
import BaseMangerCircleManager from '@/views/generals/managers/Base/components/CircleManager.vue'
import CCard from '@/components/commons/Card/index.vue'
import { useRoute } from 'vue-router'

const i18n = useI18n()
const route = useRoute()

const breadcrumbs: Array<CBreadcrumb> = [
  {
    title: i18n.t('router.Home'),
    path: { name: 'Home' },
  },
  {
    title: i18n.t(`router.${route.name}`),
    disabled: true,
  },
]
</script>
