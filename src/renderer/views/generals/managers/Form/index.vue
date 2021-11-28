<template>
  <div>
    <c-header-layout
      class="tw-flex-grow-0 tw-flex-shrink"
      :title="$t('router.FormManager')"
      :breadcrumbs="breadcrumbs"
    />
    <div
      class="tw-flex"
    >
      <div
        class="tw-bg-white p-2 md:tw-w-5/12 tw-w-full"
      >
        <c-form
          ref="formRef"
        >
          <!-- Manager images -->
          <div
            class="form-subtitle"
          >
            Manager Images
          </div>
          <div
            id="manager-image-list"
            class="tw-flex tw-space-x-4"
          >
            <div>
              <div>
                Full manager
              </div>
              <c-image-input
                v-model="mainImg"
              />
            </div>
            <div
              class="tw-flex tw-flex-col tw-justify-end"
            >
              <div>
                Circle manager
              </div>
              <c-image-input
                v-model="circleImg"
                height="56px"
                width="56px"
              />
            </div>
          </div>
          <div
            id="manager-setting"
          >
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
          </div>
          <!-- Random click message -->
          <c-card
            id="random-click-message-list"
            class="tw-p-2 tw-shadow-none tw-mb-3"
          >
            <div
              class="form-subtitle"
            >
              Random click messages
            </div>
            <div
              class="tw-flex tw-flex-col tw-space-y-2"
            >
              <c-row-display
                v-for="(message, index) in randClickMessageList"
                :key="`randClickMessage-${index}`"
              >
                <div
                  class="tw-mr-4"
                >
                  {{ index + 1 }}.
                </div>
                <c-base-input
                  id="name-input"
                  v-model="message.message"
                />
              </c-row-display>
            </div>
            <c-button
              class="btn-outline-primary btn-sm tw-w-full tw-mt-3"
              @click="onClickAddRandClickMessageBtn"
            >
              Add
            </c-button>
          </c-card>
          <!-- Morning message -->
          <c-card
            id="morning-message-list"
            class="tw-p-2 tw-shadow-none tw-mb-3"
          >
            <div
              class="form-subtitle"
            >
              Morning messages
            </div>
            <div
              class="tw-flex tw-flex-col tw-space-y-2"
            >
              <c-row-display
                v-for="(message, index) in morningMessageList"
                :key="`randClickMessage-${index}`"
              >
                <div
                  class="tw-mr-4"
                >
                  {{ index + 1 }}.
                </div>
                <c-base-input
                  id="name-input"
                  v-model="message.message"
                />
              </c-row-display>
            </div>
            <c-button
              class="btn-outline-primary btn-sm tw-w-full tw-mt-3"
              @click="onClickAddMorningMessageBtn"
            >
              Add
            </c-button>
          </c-card>
          <!-- Lunch message -->
          <c-card
            id="lunch-message-list"
            class="tw-p-2 tw-shadow-none tw-mb-3"
          >
            <div
              class="form-subtitle"
            >
              Lunch messages
            </div>
            <div
              class="tw-flex tw-flex-col tw-space-y-2"
            >
              <c-row-display
                v-for="(message, index) in lunchMessageList"
                :key="`randClickMessage-${index}`"
              >
                <div
                  class="tw-mr-4"
                >
                  {{ index + 1 }}.
                </div>
                <c-base-input
                  id="name-input"
                  v-model="message.message"
                />
              </c-row-display>
            </div>
            <c-button
              class="btn-outline-primary btn-sm tw-w-full tw-mt-3"
              @click="onClickAddLunchMessageBtn"
            >
              Add
            </c-button>
          </c-card>
          <!-- Evening message -->
          <c-card
            id="evening-message-list"
            class="tw-p-2 tw-shadow-none tw-mb-3"
          >
            <div
              class="form-subtitle"
            >
              Evening messages
            </div>
            <div
              class="tw-flex tw-flex-col tw-space-y-2"
            >
              <c-row-display
                v-for="(message, index) in eveningMessageList"
                :key="`randClickMessage-${index}`"
              >
                <div
                  class="tw-mr-4"
                >
                  {{ index + 1 }}.
                </div>
                <c-base-input
                  id="name-input"
                  v-model="message.message"
                />
              </c-row-display>
            </div>
            <c-button
              class="btn-sm btn-outline-primary tw-w-full tw-mt-3"
              @click="onClickAddEveningMessageBtn"
            >
              Add
            </c-button>
          </c-card>
          <!-- night message -->
          <c-card
            id="night-message-list"
            class="tw-p-2 tw-shadow-none"
          >
            <div
              class="form-subtitle"
            >
              Night messages
            </div>
            <div
              class="tw-flex tw-flex-col tw-space-y-2"
            >
              <c-row-display
                v-for="(message, index) in nightMessageList"
                :key="`randClickMessage-${index}`"
              >
                <div
                  class="tw-mr-4"
                >
                  {{ index + 1 }}.
                </div>
                <c-base-input
                  id="name-input"
                  v-model="message.message"
                />
              </c-row-display>
            </div>
            <c-button
              class="btn-outline-primary btn-sm tw-w-full tw-mt-3"
              @click="onClickAddNightMessageBtn"
            >
              Add
            </c-button>
          </c-card>
        </c-form>
        <hr
          class="tw-my-2"
        >
        <div
          class="tw-flex tw-justify-end"
        >
          <c-button
            class="tw-mr-2"
          >
            {{ $t('commons.actions.cancel') }}
          </c-button>
          <c-button
            v-if="!isEditForm"
            class="btn-primary"
            @click="onClickCreateBtn"
          >
            {{ $t('commons.actions.create') }}
          </c-button>
          <c-button
            v-else
            class="btn-primary"
            @click="onClickUpdateBtn"
          >
            {{ $t('commons.actions.update') }}
          </c-button>
        </div>
      </div>
      <div
        class="tw-fixed tw-right-8 tw-w-3/12"
      >
        <form-manger-title-navigator />
      </div>
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
import { computed, onMounted, ref } from 'vue'
import { ManagerCreateForm, ManagerMessage, ManagerUpdateForm } from '@/types/models/Manager'
import CRowDisplayLabel from '@/components/commons/displays/Row/components/Label.vue'
import CRowDisplay from '@/components/commons/displays/Row/index.vue'
import CRowDisplayContent from '@/components/commons/displays/Row/components/Content.vue'
import CButton from '@/components/commons/Button/index.vue'
import CImageInput from '@/components/commons/inputs/Image/index.vue'
import FormMangerTitleNavigator from '@/views/generals/managers/Form/components/TtileNavigator.vue'
import useStore from '@/store'
import { useRoute } from 'vue-router'
import CCard from '@/components/commons/Card/index.vue'
import { ManagerActionTypes } from '@/store/modules/model/manager/actions'
import { getCircleImageFile, getCircleImageFileAsBlob, getImageFile, getImageFileAsBlob } from '@/utils/manager'

const i18n = useI18n()
const store = useStore()
const route = useRoute()

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

const formRef = ref<HTMLFormElement>()

const mainImg = ref()
const circleImg = ref()
const name = ref('')
const randClickMessageList = ref<Array<ManagerMessage>>([])
const morningMessageList = ref<Array<ManagerMessage>>([])
const lunchMessageList = ref<Array<ManagerMessage>>([])
const eveningMessageList = ref<Array<ManagerMessage>>([])
const nightMessageList = ref<Array<ManagerMessage>>([])

const isEditForm = computed(() => route.name === 'FormEditManager')
const manager = computed(() => store.state.manager.manager)

onMounted(() => {
  initData()
})

const initData = async () => {
  console.log(isEditForm.value)
  if (isEditForm.value) {
    const { id } = route.params
    await store.dispatch(ManagerActionTypes.LOAD_MANAGER, id)
    mainImg.value = await getImageFileAsBlob(manager.value)
    circleImg.value = await getCircleImageFileAsBlob(manager.value)
    name.value = manager.value.name
    randClickMessageList.value = manager.value.randClickMessages
    morningMessageList.value = manager.value.morningMessages
    lunchMessageList.value = manager.value.lunchMessages
    eveningMessageList.value = manager.value.eveningsMessages
    nightMessageList.value = manager.value.nightMessages
  }
}

const onClickAddRandClickMessageBtn = () => {
  randClickMessageList.value.push({} as ManagerMessage)
}

const onClickAddMorningMessageBtn = () => {
  morningMessageList.value.push({} as ManagerMessage)
}

const onClickAddLunchMessageBtn = () => {
  lunchMessageList.value.push({} as ManagerMessage)
}

const onClickAddEveningMessageBtn = () => {
  eveningMessageList.value.push({} as ManagerMessage)
}

const onClickAddNightMessageBtn = () => {
  nightMessageList.value.push({} as ManagerMessage)
}

const onClickCreateBtn = async () => {
  try {
    await store.dispatch(ManagerActionTypes.CREATE_MANAGER, {
      name: name.value,
      randClickMessages: randClickMessageList.value,
      morningMessages: morningMessageList.value,
      lunchMessages: lunchMessageList.value,
      eveningsMessages: eveningMessageList.value,
      nightMessages: nightMessageList.value,
    } as ManagerCreateForm)
  } catch (e) {
    console.error(e)
  }
}

const onClickUpdateBtn = async () => {
  try {
    await store.dispatch(ManagerActionTypes.UPDATE_MANAGER, {
      id: manager.value.id,
      name: name.value,
      randClickMessages: randClickMessageList.value,
      morningMessages: morningMessageList.value,
      lunchMessages: lunchMessageList.value,
      eveningsMessages: eveningMessageList.value,
      nightMessages: nightMessageList.value,
    } as ManagerUpdateForm)
  } catch (e) {
    console.error(e)
  }
}

</script>
<style
  lang="scss"
  scoped
>
.form-subtitle {
  @apply tw-text-sm tw-text-gray-500 tw-mb-1;
}
</style>
