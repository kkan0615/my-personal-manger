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
      <div
        class="tw-text-lg tw-font-semibold"
      >
        {{ manager.name }}
      </div>
    </div>
  </c-card>
  <!-- Modal -->
  <div
    id="manager-modal"
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
        <div class="modal-body tw-flex">
          <div>
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
          </div>
          <div>
            test2
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
import { computed, defineProps, onMounted, PropType, ref } from 'vue'
import CCard from '@/components/commons/Card/index.vue'
import { Manager } from '@/types/models/Manager'
import useElectron from '@/mixins/useElectron'
import useStore from '@/store'
import BaseMangerFullManager from '@/views/generals/managers/Base/components/FullManager.vue'
import BaseMangerCircleManager from '@/views/generals/managers/Base/components/CircleManager.vue'

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

const imgSrc = ref('')
const isActive = computed(() => store.state.manager.id === props.manager.id)

onMounted(async () => {
  imgSrc.value = await getImageFile()
})

const getImageFile = async () => {
  if (props.manager) {
    const imageBuffer: Buffer = await ipcRenderer.invoke('get-manager-image', {
      id: props.manager?.id,
      img: props.manager?.img,
    } as Manager)
    const imgData = new Blob([imageBuffer], { type: 'image/png' })
    return URL.createObjectURL(imgData)
  }
}

</script>
