<template>
  <div
    class="tw-h-full tw-flex tw-flex-col"
  >
    <c-header-layout
      class="tw-flex-grow-0 tw-flex-shrink"
      :title="$t('router.BaseManager')"
      :breadcrumbs="breadcrumbs"
    />
    <div
      class="tw-flex tw-flex-grow tw-flex-shrink-0"
    >
      <c-card
        class="tw-bg-white tw-flex-grow-0 tw-flex-shrink tw-mr-2"
      >
        <div
          class="tw-p-2 tw-text-lg tw-font-semibold tw-flex tw-items-center"
        >
          <div
            class="tw-mr-auto"
          >
            Current Manager
          </div>
          <base-manger-setting-dropdown />
        </div>
        <hr>
        <div
          class="tw-p-2"
        >
          <!-- full manager -->
          <div
            class="tw-mb-4"
          >
            <div
              class="tw-mb-2 tw-font-semibold"
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
              class="tw-mb-2 tw-font-semibold"
            >
              Circle Manager
            </div>
            <div>
              <base-manger-circle-manager />
            </div>
          </div>
        </div>
      </c-card>
      <div
        class="tw-flex-grow tw-flex-shrink-0"
      >
        <div
          class="tw-grid tw-grid-cols-6 tw-gap-4"
        >
          <base-manger-manager-card
            v-for="manager in managerList"
            :key="manager.manager.id"
            :manager="manager"
          />
          <base-manger-new-card />
        </div>
      </div>
    </div>
  </div>
</template>
<script
    lang="ts"
>
export default {
  name: 'BaseManger',
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
import useStore from '@/store'
import { computed } from 'vue'
import { ManagerActionTypes } from '@/store/modules/model/manager/actions'
import BaseMangerManagerCard from '@/views/generals/managers/Base/components/ManagerCard.vue'
import BaseMangerNewCard from '@/views/generals/managers/Base/components/NewCard.vue'
import BaseMangerSettingDropdown from '@/views/generals/managers/Base/components/SettingDropdown.vue'

const i18n = useI18n()
const route = useRoute()
const store = useStore()

const breadcrumbs: Array<CBreadcrumb> = [
  {
    title: i18n.t('router.Home'),
    path: { name: 'Home' },
  },
  {
    title: i18n.t('router.BaseManager'),
    disabled: true,
  },
]

const managerList = computed(() => store.state.manager.managerList)

store.dispatch(ManagerActionTypes.LOAD_MANAGER_LIST)
// Created
</script>
