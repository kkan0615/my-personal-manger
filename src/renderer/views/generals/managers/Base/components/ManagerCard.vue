<template>
  <c-card
    class="tw-h-48 tw-bg-white tw-cursor-pointer hover:tw-bg-gray-100"
    data-bs-toggle="modal"
    data-bs-target="#manager-modal"
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
    id="manager-modal"
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
            Edit
          </c-button>
          <c-button
            class="btn-danger"
            @click="onClickDelete"
          >
            Delete
          </c-button>
          <c-button
            class="btn-success"
            @click="onClickSetManager"
          >
            Set manager
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
                <div
                  class="tw-mb-2 tw-font-semibold"
                >
                  Full Manager
                </div>
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
                <div
                  class="tw-mb-2 tw-font-semibold"
                >
                  Circle Manager
                </div>
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
            <div>
              <div
                class="tw-font-semibold"
              >
                Config
              </div>
              <div
                class="tw-flex tw-items-center"
              >
                <div>
                  Name
                </div>
                <div
                  class="tw-ml-auto"
                >
                  {{ manager.name }}
                </div>
              </div>
              <!-- Morning messages -->
              <div>
                <div
                  class="tw-font-semibold"
                >
                  Morning Messages
                </div>
                <div
                  v-for="(message, i) in manager.morningMessages"
                  :key="`morningMessage-${i}`"
                  class="tw-flex tw-items-center"
                >
                  <div>
                    {{ i + 1 }}
                  </div>
                  <div
                    class="tw-ml-auto"
                  >
                    {{ message.message }}
                  </div>
                </div>
              </div>
              <!-- lunch messages -->
              <div>
                <div
                  class="tw-font-semibold"
                >
                  Lunch Messages
                </div>
                <div
                  v-for="(message, i) in manager.lunchMessages"
                  :key="`lunchMessage-${i}`"
                  class="tw-flex tw-items-center"
                >
                  <div>
                    {{ i + 1 }}
                  </div>
                  <div
                    class="tw-ml-auto"
                  >
                    {{ message.message }}
                  </div>
                </div>
              </div>
              <!-- Night messages -->
              <div>
                <div
                  class="tw-font-semibold"
                >
                  Evening Messages
                </div>
                <div
                  v-for="(message, i) in manager.eveningsMessages"
                  :key="`nightMessage-${i}`"
                  class="tw-flex tw-items-center"
                >
                  <div>
                    {{ i + 1 }}
                  </div>
                  <div
                    class="tw-ml-auto"
                  >
                    {{ message.message }}
                  </div>
                </div>
              </div>

              <!-- Night messages -->
              <div>
                <div
                  class="tw-font-semibold"
                >
                  Click Messages
                </div>
                <div
                  v-for="(message, i) in manager.randClickMessages"
                  :key="`randClickMessage-${i}`"
                  class="tw-flex tw-items-center"
                >
                  <div>
                    {{ i + 1 }}
                  </div>
                  <div
                    class="tw-ml-auto"
                  >
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

const props = defineProps({
  manager: {
    type: Object as PropType<Manager>,
    required: true,
    default: () => {},
  },
  active: {
    type: Boolean,
    required: false,
    default: false,
  }
})

const { ipcRenderer } = useElectron()
const store = useStore()
const router = useRouter()
const { showToast } = useToast()

const imgSrc = ref()
const circleImg = ref()
const modalRef = ref()
const modalInstance = ref<BModal | undefined>()
const isActive = computed(() => store.state.manager.manager.id === props.manager.id)

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
  }
}
const onClickDelete = () => {
  console.log('onClickEdit')
}

const onClickSetManager = async () => {
  try {
    if (props.manager) {
      await store.dispatch(CurrentActionTypes.RESET_MANAGER)
      await store.dispatch(ManagerActionTypes.SET_MANAGER_ID, props.manager.id)
      await store.dispatch(CurrentActionTypes.LOAD_MANAGER)

      showToast({
        title: 'Success',
        content: 'Success to change',
        type: 'success'
      })
    }
  } catch (e) {
    console.error(e)
  }
}
</script>
<style
  scoped
  lang="scss"
>
.manager-card {
  .subtitle {
    @apply tw-text-gray-500
  }
}
</style>
