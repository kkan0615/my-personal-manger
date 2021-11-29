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
        class="tw-bg-white p-2 lg:tw-w-5/12 tw-w-full"
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
            class="tw-mb-2"
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
                <c-material-icon
                  class="tw-ml-2 tw-cursor-pointer"
                  @click="onClickRemoveRandClickMessageBtn"
                >
                  remove
                </c-material-icon>
              </c-row-display>
            </div>
            <c-button
              class="btn-outline-primary btn-sm tw-mt-3"
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
                <c-material-icon
                  class="tw-ml-2  tw-cursor-pointer"
                  @click="onClickRemoveMorningMessageBtn"
                >
                  remove
                </c-material-icon>
              </c-row-display>
            </div>
            <c-button
              class="btn-outline-primary btn-sm tw-mt-3"
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
                <c-material-icon
                  class="tw-ml-2 tw-cursor-pointer"
                  @click="onClickRemoveLunchMessageBtn"
                >
                  remove
                </c-material-icon>
              </c-row-display>
            </div>
            <c-button
              class="btn-outline-primary btn-sm tw-mt-3"
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
                <c-material-icon
                  class="tw-ml-2 tw-cursor-pointer"
                  @click="onClickRemoveEveningMessageBtn"
                >
                  remove
                </c-material-icon>
              </c-row-display>
            </div>
            <c-button
              class="btn-sm btn-outline-primary tw-mt-3"
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
                <c-material-icon
                  class="tw-ml-2 tw-cursor-pointer"
                  @click="onClickRemoveNightMessageBtn"
                >
                  remove
                </c-material-icon>
              </c-row-display>
            </div>
            <c-button
              class="btn-outline-primary btn-sm tw-mt-3"
              @click="onClickAddNightMessageBtn"
            >
              Add
            </c-button>
          </c-card>
        </c-form>
        <hr
          class="tw-my-2"
        >
        <!-- actions -->
        <div
          class="tw-flex tw-justify-end"
        >
          <c-button
            class="tw-mr-2"
            @click="onClickCancelBtn"
          >
            {{ $t('commons.actions.cancel') }}
          </c-button>
          <c-button
            class="btn-primary"
            @click="onClickSaveBtn"
          >
            {{ isEditForm ? $t('commons.actions.update') : $t('commons.actions.create') }}
          </c-button>
        </div>
      </div>
      <!-- Navigator -->
      <div
        class="xl:tw tw-fixed tw-right-8 tw-w-3/12"
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
import { ManagerCreateForm, ManagerDisplayStyle, ManagerMessage, ManagerUpdateForm } from '@/types/models/Manager'
import CRowDisplayLabel from '@/components/commons/displays/Row/components/Label.vue'
import CRowDisplay from '@/components/commons/displays/Row/index.vue'
import CRowDisplayContent from '@/components/commons/displays/Row/components/Content.vue'
import CButton from '@/components/commons/Button/index.vue'
import CImageInput from '@/components/commons/inputs/Image/index.vue'
import FormMangerTitleNavigator from '@/views/generals/managers/Form/components/TtileNavigator.vue'
import useStore from '@/store'
import { useRoute, useRouter } from 'vue-router'
import CCard from '@/components/commons/Card/index.vue'
import { ManagerActionTypes } from '@/store/modules/model/manager/actions'
import { getCircleImageFileAsBlob, getImageFileAsBlob } from '@/utils/manager'
import CMaterialIcon from '@/components/commons/icons/Material/index.vue'
import useToast from '@/mixins/useToast'

const i18n = useI18n()
const store = useStore()
const route = useRoute()
const router = useRouter()
const { showToast } = useToast()

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

const mainImg = ref<File>()
const circleImg = ref<File>()
const name = ref('')
const randClickMessageList = ref<Array<ManagerMessage>>([])
const morningMessageList = ref<Array<ManagerMessage>>([])
const lunchMessageList = ref<Array<ManagerMessage>>([])
const eveningMessageList = ref<Array<ManagerMessage>>([])
const nightMessageList = ref<Array<ManagerMessage>>([])
const displayStyle = ref<ManagerDisplayStyle>('ALL')

const isEditForm = computed(() => route.name === 'FormEditManager')
const manager = computed(() => store.state.manager.manager)

onMounted(() => {
  initData()
})

const initData = async () => {
  if (isEditForm.value) {
    console.log(route.params)
    const { id } = route.params
    await store.dispatch(ManagerActionTypes.LOAD_MANAGER, id as string)
    console.log(manager.value)
    mainImg.value = await getImageFileAsBlob(manager.value)
    circleImg.value = await getCircleImageFileAsBlob(manager.value)
    name.value = manager.value.name
    randClickMessageList.value = manager.value.randClickMessages
    morningMessageList.value = manager.value.morningMessages
    lunchMessageList.value = manager.value.lunchMessages
    eveningMessageList.value = manager.value.eveningsMessages
    nightMessageList.value = manager.value.nightMessages
  } else {
    randClickMessageList.value = [{ message: '', sound: undefined }] // at least one message
    morningMessageList.value = [{ message: '', sound: undefined }] // at least one message
    lunchMessageList.value = [{ message: '', sound: undefined }] // at least one message
    eveningMessageList.value = [{ message: '', sound: undefined }] // at least one message
    nightMessageList.value = [{ message: '', sound: undefined }] // at least one message
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

const onClickRemoveRandClickMessageBtn = (index: number) => {
  randClickMessageList.value.splice(index, 1)
}

const onClickRemoveMorningMessageBtn = (index: number) => {
  morningMessageList.value.splice(index, 1)
}

const onClickRemoveLunchMessageBtn = (index: number) => {
  lunchMessageList.value.splice(index, 1)
}

const onClickRemoveEveningMessageBtn = (index: number) => {
  eveningMessageList.value.splice(index, 1)
}

const onClickRemoveNightMessageBtn = (index: number) => {
  nightMessageList.value.splice(index, 1)
}

const onClickSaveBtn = async () => {
  if (isEditForm.value) {
    await updateManager()
  } else {
    await createManager()
  }
}

const onClickCancelBtn = async () => {
  await router.go(-1)
}

const createManager = async () => {
  try {
    await store.dispatch(ManagerActionTypes.CREATE_MANAGER, {
      name: name.value,
      displayStyle: displayStyle.value,
      img: mainImg.value ? mainImg.value.name : '',
      circleImg: circleImg.value ? circleImg.value.name : '',
      mainImgFile: mainImg.value ? new Int8Array(await mainImg.value.arrayBuffer()) : undefined,
      circleImgFile: circleImg.value ? new Int8Array(await circleImg.value.arrayBuffer()) : undefined,
      randClickMessages: randClickMessageList.value || [],
      morningMessages: morningMessageList.value || [],
      lunchMessages: lunchMessageList.value || [],
      eveningsMessages: eveningMessageList.value || [],
      nightMessages: nightMessageList.value || [],
    } as ManagerCreateForm)

    await router.push({ name: 'BaseManager' })
    showToast({
      title: 'Success',
      content: 'Success to change',
      type: 'success'
    })
  } catch (e) {
    console.error(e)
  }
}

const updateManager = async () => {
  try {
    await store.dispatch(ManagerActionTypes.UPDATE_MANAGER, {
      id: manager.value.id,
      name: name.value,
      displayStyle: displayStyle.value,
      img: mainImg.value && mainImg.value.name ? mainImg.value.name : manager.value.img || '',
      circleImg: circleImg.value && circleImg.value.name ? circleImg.value.name : manager.value.circleImg || '',
      mainImgFile: mainImg.value && mainImg.value.name ? new Int8Array(await mainImg.value.arrayBuffer()) : manager.value.mainImgFile || undefined,
      circleImgFile: circleImg.value && circleImg.value.name ? new Int8Array(await circleImg.value.arrayBuffer()) : manager.value.circleImgFile || undefined,
      randClickMessages: randClickMessageList.value || [],
      morningMessages: morningMessageList.value || [],
      lunchMessages: lunchMessageList.value || [],
      eveningsMessages: eveningMessageList.value || [],
      nightMessages: nightMessageList.value || [],
    } as ManagerUpdateForm)

    await router.push({ name: 'BaseManager' })
    showToast({
      title: 'Success',
      content: 'Success to change',
      type: 'success'
    })
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
