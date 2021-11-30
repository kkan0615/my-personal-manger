<template>
  <c-card
    class="tw-h-48 tw-bg-white tw-cursor-pointer hover:tw-bg-gray-100"
    data-bs-toggle="modal"
    :data-bs-target="`#${modalId}`"
    :class="{
      'tw-ring': isActive,
    }"
  >
    <div
      class="tw-p-3"
    >
      <div
        class="tw-h-32 tw-flex tw-justify-center"
      >
        <img
          class="tw-w-auto tw-h-full"
          :src="imgSrc"
          alt="manager"
        >
      </div>
    </div>
    <hr>
    <div
      class="tw-text-lg tw-px-2"
    >
      {{ manager.name }}
    </div>
  </c-card>
  <!-- Modal -->
  <div
    :id="modalId"
    ref="modalRef"
    class="modal fade"
    tabindex="-1"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5
            id="exampleModalLabel"
            class="modal-title"
          >
            {{ manager.name }}
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          />
        </div>
        <div
          class="tw-w-full tw-flex tw-items-center tw-justify-end tw-space-x-2 tw-px-4 tw-py-2"
        >
          <c-button
            class="btn-primary"
            @click="onClickEdit"
          >
            {{ $t('commons.Actions.update') }}
          </c-button>
          <c-button
            class="btn-danger"
            @click="onClickDeleteBtn"
          >
            {{ $t('commons.Actions.delete') }}
          </c-button>
          <c-button
            class="btn-success"
            @click="onClickSetManager"
          >
            {{ $t('commons.Actions.setToManager') }}
          </c-button>
        </div>
        <hr>
        <div class="modal-body tw-flex">
          <div
            style="width: 300px"
          >
            <div
              class="tw-p-2"
            >
              <!-- full manager -->
              <div
                class="tw-mb-4"
              >
                <c-subtitle-typo>
                  Full Manager
                </c-subtitle-typo>
                <div
                  class="manager-container"
                >
                  <img
                    class="tw-w-auto tw-h-full"
                    :src="imgSrc"
                    alt="manager"
                  >
                </div>
              </div>
              <!-- Circle manager -->
              <div>
                <c-subtitle-typo>
                  Circle Manager
                </c-subtitle-typo>
                <div
                  class="circle-manager-container"
                >
                  <img
                    class="tw-w-auto tw-h-full tw-cursor-pointer tw-bg-transparent tw-object-cover "
                    alt="manager"
                    :src="circleImg"
                  >
                </div>
              </div>
            </div>
          </div>
          <div
            class="tw-flex-grow tw-flex-shrink"
          >
            <div
              class="tw-flex-col tw-space-y-2"
            >
              <div>
                <!-- Manger -->
                <c-subtitle-typo>
                  Manager
                </c-subtitle-typo>
                <!-- id -->
                <c-row-display>
                  <c-row-display-label
                    class="tw-font-semibold"
                  >
                    {{ $t('Types.Models.Attributes.id') }}
                  </c-row-display-label>
                  <c-row-display-content>
                    {{ manager.id }}
                  </c-row-display-content>
                </c-row-display>
                <!-- Name -->
                <c-row-display>
                  <c-row-display-label
                    class="tw-font-semibold"
                  >
                    {{ $t('Types.Models.Attributes.name') }}
                  </c-row-display-label>
                  <c-row-display-content>
                    {{ manager.name }}
                  </c-row-display-content>
                </c-row-display>
              </div>
              <!-- Morning messages -->
              <div>
                <c-subtitle-typo>
                  Morning Messages
                </c-subtitle-typo>
                <div
                  v-for="(message, i) in manager.morningMessages"
                  :key="`morningMessage-${i}`"
                  class="tw-flex tw-items-center"
                >
                  <div
                    class="tw-mr-2"
                  >
                    {{ i + 1 }}.
                  </div>
                  <div>
                    {{ message.message }}
                  </div>
                </div>
              </div>
              <!-- lunch messages -->
              <div>
                <c-subtitle-typo>
                  Lunch Messages
                </c-subtitle-typo>
                <div
                  v-for="(message, i) in manager.lunchMessages"
                  :key="`lunchMessage-${i}`"
                  class="tw-flex tw-items-center"
                >
                  <div
                    class="tw-mr-2"
                  >
                    {{ i + 1 }}.
                  </div>
                  <div>
                    {{ message.message }}
                  </div>
                </div>
              </div>
              <!-- Night messages -->
              <div>
                <c-subtitle-typo>
                  Evening Messages
                </c-subtitle-typo>
                <div
                  v-for="(message, i) in manager.eveningsMessages"
                  :key="`nightMessage-${i}`"
                  class="tw-flex tw-items-center"
                >
                  <div
                    class="tw-mr-2"
                  >
                    {{ i + 1 }}.
                  </div>
                  <div>
                    {{ message.message }}
                  </div>
                </div>
              </div>

              <!-- Night messages -->
              <div>
                <c-subtitle-typo>
                  Click Messages
                </c-subtitle-typo>
                <div
                  v-for="(message, i) in manager.randClickMessages"
                  :key="`randClickMessage-${i}`"
                  class="tw-flex tw-items-center"
                >
                  <div
                    class="tw-mr-2"
                  >
                    {{ i + 1 }}.
                  </div>
                  <div>
                    {{ message.message }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
export default {
  name: 'BaseMangerManagerCard',
}
</script>
<script setup lang="ts">
import { computed, defineProps, onBeforeUnmount, onMounted, PropType, ref } from 'vue'
import CCard from '@/components/commons/Card/index.vue'
import { Manager } from '@/types/models/Manager'
import useElectron from '@/mixins/useElectron'
import useStore from '@/store'
import CButton from '@/components/commons/Button/index.vue'
import { useRouter } from 'vue-router'
import { ManagerActionTypes } from '@/store/modules/model/manager/actions'
import { getCircleImageFile, getImageFile } from '@/utils/manager'
import useToast from '@/mixins/useToast'
import { Modal as BModal } from 'bootstrap'
import { CurrentActionTypes } from '@/store/modules/systems/current/actions'
import CSubtitleTypo from '@/components/commons/typographies/Subtitle/index.vue'
import CRowDisplay from '@/components/commons/displays/Row/index.vue'
import CRowDisplayContent from '@/components/commons/displays/Row/components/Content.vue'
import CRowDisplayLabel from '@/components/commons/displays/Row/components/Label.vue'

const props = defineProps({
  manager: {
    type: Object as PropType<Manager>,
    required: true,
    default: () => {},
  },
  index: {
    type: Number,
    required: false,
    default: 0,
  },
})

const { ipcRenderer } = useElectron()
const store = useStore()
const router = useRouter()
const { showToast } = useToast()

const imgSrc = ref()
const circleImg = ref()
const modalRef = ref()
const modalInstance = ref<BModal | undefined>()

const isActive = computed(() => store.state.current.manager.id === props.manager.id)
const modalId = computed(() => `modal-id-${props.index || 0}`)

onMounted(async () => {
  imgSrc.value = await getImage()
  circleImg.value = await getCircleImage()
  modalInstance.value = new BModal(modalRef.value)
})

onBeforeUnmount(() => {
  if (modalInstance.value) {
    modalInstance.value.dispose()
  }
})

const getImage = async () => {
  if (props.manager) {
    return getImageFile(props.manager)
  }
}

const getCircleImage = async () => {
  if (props.manager) {
    return getCircleImageFile(props.manager)
  }
}

const onClickEdit = async () => {
  try {
    if (props.manager)
      await router.push({ name: 'FormEditManager', params: { id: props.manager.id } })
  } catch (e) {
    console.error(e)
    showToast({
      title: 'Redirect',
      content: 'Redirect',
      type: 'danger'
    })
  }
}
const onClickDeleteBtn = async () => {
  try {
    if (props.manager) {
      await store.dispatch(ManagerActionTypes.DELETE_MANAGER, props.manager.id)
      await store.dispatch(CurrentActionTypes.RESET_MANAGER)
      await store.dispatch(CurrentActionTypes.LOAD_MANAGER)
      await store.dispatch(ManagerActionTypes.LOAD_MANAGER_LIST)

      showToast({
        title: 'Success',
        content: 'Success to change',
        type: 'success'
      })
    }
  } catch (e) {
    console.error(e)
    showToast({
      title: 'Fail',
      content: 'Fail to delete',
      type: 'danger'
    })
  }
}

const onClickSetManager = async () => {
  try {
    if (props.manager) {
      await store.dispatch(CurrentActionTypes.RESET_MANAGER)
      await store.dispatch(ManagerActionTypes.SET_MANAGER_ID, props.manager.id)
      await store.dispatch(CurrentActionTypes.LOAD_MANAGER)

      showToast({
        title: 'Success',
        content: 'Success to Set',
        type: 'success'
      })
    }
  } catch (e) {
    console.error(e)
    showToast({
      title: 'Fail',
      content: 'Fail to set',
      type: 'danger'
    })
  }
}
</script>
<style
  scoped
  lang="scss"
>

</style>
