<template>
  <c-modal
    ref="modalRef"
  >
    <template
      #activator="{ open, }"
    >
      <c-button
        class="btn-primary"
        @click="onClickOpenBtn(open)"
      >
        {{ $t('commons.Actions.search') }}
      </c-button>
    </template>
    <div>
      <div class="modal-header">
        <h5
          class="modal-title"
        >
          {{ $t('commons.Actions.search') }}
        </h5>
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="modal"
          aria-label="Close"
        />
      </div>
      <div
        class="modal-body"
      >
        <c-form
          ref="formRef"
          class="tw-space-y-3"
        >
          <!-- title -->
          <c-row-display>
            <c-row-display-label
              required
            >
              Display
            </c-row-display-label>
            <c-row-display-content>
              <div
                class="btn-group"
                role="group"
                aria-label="Basic example"
              >
                <button
                  type="button"
                  class="btn"
                  :class="{
                    'btn-primary': includeSave,
                    'btn-outline-primary': !includeSave,
                  }"
                  @click="includeSave = !includeSave"
                >
                  Saved
                </button>
                <button
                  type="button"
                  class="btn "
                  :class="{
                    'btn-primary': includeDone,
                    'btn-outline-primary': !includeDone,
                  }"
                  @click="includeDone = !includeDone"
                >
                  Done
                </button>
              </div>
            </c-row-display-content>
          </c-row-display>
          <!-- content -->
          <c-row-display>
            <c-row-display-label>
              content
            </c-row-display-label>
            <c-row-display-content>
              <c-textarea
                id="content-input"
                v-model="content"
              />
            </c-row-display-content>
          </c-row-display>
        </c-form>
      </div>
      <div class="modal-footer">
        <button
          type="button"
          class="btn"
          data-bs-dismiss="modal"
        >
          {{ $t('commons.Actions.cancel') }}
        </button>
        <button
          type="button"
          class="btn btn-primary"
          @click="onClickSearchBtn"
        >
          {{ $t('commons.Actions.search') }}
        </button>
      </div>
    </div>
  </c-modal>
</template>
<script lang="ts">
export default {
  name: 'BaseScheduleFilterDialog',
}
</script>
<script setup lang="ts">
import CModal from '@/components/commons/Modal/index.vue'
import CButton from '@/components/commons/Button/index.vue'
import CForm from '@/components/commons/Form/index.vue'
import CRowDisplay from '@/components/commons/displays/Row/index.vue'
import CRowDisplayLabel from '@/components/commons/displays/Row/components/Label.vue'
import CRowDisplayContent from '@/components/commons/displays/Row/components/Content.vue'
import CBaseInput from '@/components/commons/inputs/Base/index.vue'
import { computed, ref } from 'vue'
import dayjs from 'dayjs'
import useStore from '@/store'
import { ScheduleActionTypes } from '@/store/modules/model/schedule/actions'
import useToast from '@/mixins/useToast'
import CTextarea from '@/components/commons/inputs/Textarea/index.vue'
import { ScheduleSelectListQuery } from '@/types/models/Schedule/filter'

const store = useStore()
const { showToast } = useToast()

const formRef = ref<HTMLFormElement>()
const modalRef = ref<any>()
const includeSave = ref(false)
const includeDone = ref(false)

const scheduleListOption = computed(() => store.state.schedule.scheduleListOption)

const initData = () => {
  includeSave.value = scheduleListOption.value.includeSave
  includeDone.value = scheduleListOption.value.includeDone
}

const onClickOpenBtn = (cb: () => void) =>{
  initData()
  cb()
}

const onClickSearchBtn = async () => {
  try {
    const params = {
      includeSave: includeSave.value,
      includeDone: includeDone.value,
    } as ScheduleSelectListQuery
    await store.dispatch(ScheduleActionTypes.SET_SCHEDULE_LIST_OPTION, params)
    /* Load list by selected */
    await store.dispatch(ScheduleActionTypes.LOAD_SCHEDULE_LIST, params)
    /* Reset data */
    initData()
    if (modalRef.value) {
      modalRef.value.closeModal()
    }
  } catch (e) {
    console.error(e)
  }
}
</script>
