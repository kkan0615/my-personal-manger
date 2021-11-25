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
          class="tw-flex tw-justify-center"
        >
          <div
            class="tw-w-2/12"
          >
            Name
          </div>
          <c-base-input
            id="name-input"
            v-model="name"
            class="tw-w-10/12"
          />
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
const morningMessageList = ref<Array<ManagerMessage>>([])
const lunchMessageList = ref<Array<ManagerMessage>>([])
const eveningMessageList = ref<Array<ManagerMessage>>([])
const nightMessageList = ref<Array<ManagerMessage>>([])
const randClickMessages = ref<Array<ManagerMessage>>([])
</script>
