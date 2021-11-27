<template>
  <div>
    <c-header-layout
      class="tw-flex-grow-0 tw-flex-shrink"
      :title="$t('router.FormManager')"
      :breadcrumbs="breadcrumbs"
    />
    <div
      class="tw-bg-white p-2 md:tw-w-3/4 tw-w-full"
    >
      <c-form>
        <div
          class="form-subtitle"
        >
          Manager
        </div>
        <c-row-display>
          <c-row-display-label>
            Name
          </c-row-display-label>
          <c-row-display-content>
            <c-base-input
              id="name-input"
              v-model="name"
            />
          </c-row-display-content>
        </c-row-display>
        <div>
          <div
            class="form-subtitle"
          >
            Random click messages
          </div>
          <c-row-display>
            <c-row-display-label>
              Name
            </c-row-display-label>
            <c-row-display-content>
              <c-base-input
                id="name-input"
                v-model="name"
              />
            </c-row-display-content>
          </c-row-display>
          <c-button
            class="btn-primary tw-w-full tw-mt-3"
            @click="onClickAddRandClickMessageBtn"
          >
            Add
          </c-button>
        </div>
      </c-form>
    </div>
  </div>
</template>
<script lang="ts">
export default {
  name: 'FormManger',
}
</script>
<script setup lang="ts">
import CHeaderLayout from '@/components/commons/layouts/Header/index.vue'
import { CBreadcrumb } from '@/types/libs/components/breadcrumb'
import { useI18n } from 'vue-i18n'
import CForm from '@/components/commons/Form/index.vue'
import CBaseInput from '@/components/commons/inputs/Base/index.vue'
import { ref } from 'vue'
import { ManagerMessage } from '@/types/models/Manager'
import CRowDisplayLabel from '@/components/commons/displays/Row/components/Label.vue'
import CRowDisplay from '@/components/commons/displays/Row/index.vue'
import CRowDisplayContent from '@/components/commons/displays/Row/components/Content.vue'
import CButton from '@/components/commons/Button/index.vue'

const i18n = useI18n()

const breadcrumbs: Array<CBreadcrumb> = [
  {
    title: i18n.t('router.Home'),
    path: { name: 'Home' },
  },
  {
    title: i18n.t('router.FormManager'),
    disabled: true,
  },
]

const name = ref('')
const randClickMessageList = ref<Array<ManagerMessage>>([])
const morningMessageList = ref<Array<ManagerMessage>>([])
const lunchMessageList = ref<Array<ManagerMessage>>([])
const eveningMessageList = ref<Array<ManagerMessage>>([])
const nightMessageList = ref<Array<ManagerMessage>>([])

const onClickAddRandClickMessageBtn = () => {
  randClickMessageList.value.push({} as ManagerMessage)
}

const onClickAddMorningMessageBtn = () => {
  morningMessageList.value.push({} as ManagerMessage)
}

const onClickAddLucnhMessageBtn = () => {
  lunchMessageList.value.push({} as ManagerMessage)
}

const onClickAddEveningMessageBtn = () => {
  eveningMessageList.value.push({} as ManagerMessage)
}

const onClickAddNightMessageBtn = () => {
  nightMessageList.value.push({} as ManagerMessage)
}

</script>
<style
  lang="scss"
  scoped
>
.form-subtitle {
  @apply tw-text-sm tw-text-gray-500 tw-mb-2;
}
</style>
