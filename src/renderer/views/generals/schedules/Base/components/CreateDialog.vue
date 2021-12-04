<template>
  <c-modal
    ref="modalRef"
  >
    <template
      #activator="{ open, }"
    >
      <c-button
        class="btn-success tw-mr-2"
        @click="open"
      >
        {{ $t('commons.Actions.create') }}
      </c-button>
    </template>
    <div>
      <div class="modal-header">
        <h5
          class="modal-title"
        >
          test
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
              title
            </c-row-display-label>
            <c-row-display-content>
              <c-base-input
                id="title-input"
                v-model="title"
              />
            </c-row-display-content>
          </c-row-display>
          <!-- date -->
          <c-row-display>
            <c-row-display-label
              required
            >
              date
            </c-row-display-label>
            <c-row-display-content>
              <v-date-picker
                v-model="date"
                mode="datetime"
                is24hr
                trim-weeks
                :min-date="new Date()"
                :popover="{visibility:'focus', positionFixed: true}"
              >
                <template #default="{ inputValue, inputEvents }">
                  <input
                    id="input-user-birthday"
                    class="form-control"
                    :value="inputValue"
                    placeholder="Enter Birthday"
                    v-on="inputEvents"
                  >
                </template>
              </v-date-picker>
            </c-row-display-content>
          </c-row-display>
          <!-- content -->
          <c-row-display>
            <c-row-display-label>
              content
            </c-row-display-label>
            <c-row-display-content>
              <c-base-input
                id="content-input"
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
          @click="onClickCreateBtn"
        >
          {{ $t('commons.Actions.create') }}
        </button>
      </div>
    </div>
  </c-modal>
</template>
<script lang="ts">
export default {
  name: 'BaseScheduleCreateDialog',
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
import { ref } from 'vue'
import dayjs from 'dayjs'
import useStore from '@/store'
import { ScheduleActionTypes } from '@/store/modules/model/schedule/actions'
import { ScheduleCreateForm } from '@/types/models/Schedule'
import useToast from '@/mixins/useToast'

const store = useStore()
const { showToast } = useToast()

const formRef = ref<HTMLFormElement>()
const modalRef = ref<any>()
const title = ref('')
const date = ref(dayjs().add(1, 'hour').toDate())

const initData = () => {
  title.value = ''
  date.value = dayjs().add(1, 'hour').toDate()
}

const onClickCreateBtn = async () => {
  try {
    const params = {
      title: title.value,
      date: date.value,
    } as ScheduleCreateForm

    /* Create schedule */
    await store.dispatch(ScheduleActionTypes.CREATE_SCHEDULE, params)
    /* Reload list */
    await store.dispatch(ScheduleActionTypes.LOAD_SCHEDULE_LIST)
    /* Reset data */
    initData()
    if (modalRef.value) {
      modalRef.value.closeModal()
    }
    showToast({
      title: 'Success',
      content: 'Success to change',
      type: 'success'
    })
  } catch (e) {
    console.error(e)
    showToast({
      title: 'Fail',
      content: 'Fail',
      type: 'danger'
    })
  }
}
</script>
