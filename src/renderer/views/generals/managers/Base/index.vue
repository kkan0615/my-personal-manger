<template>
  <div
    class="tw-h-full tw-flex tw-flex-col"
  >
    <c-header-layout
      class="tw-flex-grow-0 tw-flex-shrink"
      :title="$t(`router.BaseManager`)"
      :breadcrumbs="breadcrumbs"
    />
    <div
      class="tw-flex tw-flex-grow tw-flex-shrink-0 tw-w-full"
    >
      <c-card
        class="tw-w-96 tw-flex-grow tw-flex-shrink tw-mr-2"
      >
        <c-card-title
          class="tw-p-2 tw-flex tw-items-center"
        >
          <div
            class="tw-mr-auto"
          >
            {{ $t('Types.Models.Manager.Titles.currentManager') }}
          </div>
          <base-manger-setting-dropdown />
        </c-card-title>
        <hr>
        <div
          class="tw-p-2"
        >
          <!-- full manager -->
          <div
            class="tw-mb-4"
          >
            <c-card-sub-title
              class="tw-mb-2"
            >
              {{ $t('Types.Models.Manager.img') }}
            </c-card-sub-title>
            <div
              class="tw-flex"
            >
              <base-manger-full-manager />
            </div>
          </div>
          <!-- Circle manager -->
          <div>
            <c-card-sub-title
              class="tw-mb-2 "
            >
              {{ $t('Types.Models.Manager.circleImg') }}
            </c-card-sub-title>
            <div>
              <base-manger-circle-manager />
            </div>
          </div>
        </div>
      </c-card>
      <div
        class="tw-w-full tw-flex-grow tw-flex-shrink"
      >
        <div
          class="tw-flex mb-2"
        >
          <div
            class="tw-text-lg tw-font-bold"
          >
            {{ $t('Types.Models.Manager.Titles.managerList') }} ({{ managerList.length }})
          </div>
          <c-base-input
            id="search-input"
            v-model="searchValue"
            class="tw-w-56 tw-ml-auto"
            size="sm"
            :placeholder="$t('commons.Actions.search')"
          />
        </div>
        <div
          class="tw-grid md:tw-grid-cols-3 tw-grid-cols-6 tw-gap-4"
        >
          <base-manger-manager-card
            v-for="(manager, index) in managerList"
            :key="manager.id"
            :manager="manager"
            :index="index"
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
import BaseMangerFullManager from '@/views/generals/managers/Base/components/FullManager.vue'
import BaseMangerCircleManager from '@/views/generals/managers/Base/components/CircleManager.vue'
import CCard from '@/components/commons/Card/index.vue'
import BaseMangerManagerCard from '@/views/generals/managers/Base/components/ManagerCard.vue'
import BaseMangerNewCard from '@/views/generals/managers/Base/components/NewCard.vue'
import BaseMangerSettingDropdown from '@/views/generals/managers/Base/components/SettingDropdown.vue'
import { CBreadcrumb } from '@/types/libs/components/breadcrumb'
import { useI18n } from 'vue-i18n'
import useStore from '@/store'
import { computed, ref } from 'vue'
import { ManagerActionTypes } from '@/store/modules/model/manager/actions'
import CBaseInput from '@/components/commons/inputs/Base/index.vue'
import CCardTitle from '@/components/commons/Card/components/Title.vue'
import CCardSubTitle from '@/components/commons/Card/components/Subtitle.vue'

const i18n = useI18n()
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
const searchValue = ref('')

const managerList = computed(() => {
  let result = store.state.manager.managerList
  if (searchValue.value) {
    result = result.filter(manager => manager.name.includes(searchValue.value))
  }
  return result
})

store.dispatch(ManagerActionTypes.LOAD_MANAGER_LIST)
// Created
</script>
