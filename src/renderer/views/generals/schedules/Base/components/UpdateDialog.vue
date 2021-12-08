<template>
  <c-modal
    ref="modalRef"
  >
    <template
      #activator="{ open, }"
    >
      <button
        @click="onClickOpenBtn(open)"
      >
        <c-material-icon
          class="tw-text-bs-primary"
        >
          edit
        </c-material-icon>
      </button>
    </template>
    <div>
      <div class="modal-header">
        <h5
          class="modal-title"
        >
          {{ $t('commons.Actions.update') }}
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
              {{ $t('Types.Models.Schedule.title') }}
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
              {{ $t('Types.Models.Schedule.date') }}
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
                    class="form-control form-control-sm"
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
              {{ $t('Types.Models.Schedule.content') }}
            </c-row-display-label>
            <c-row-display-content>
              <c-textarea
                id="content-textarea"
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
          {{ $t('commons.Actions.update') }}
        </button>
      </div>
    </div>
  </c-modal>
</template>
<script lang="ts">
export default {
  name: 'BaseScheduleUpdateDialog',
}
</script>
<script setup lang="ts">
import CModal from '@/components/commons/Modal/index.vue'
import CForm from '@/components/commons/Form/index.vue'
import CRowDisplay from '@/components/commons/displays/Row/index.vue'
import CRowDisplayLabel from '@/components/commons/displays/Row/components/Label.vue'
import CRowDisplayContent from '@/components/commons/displays/Row/components/Content.vue'
import CBaseInput from '@/components/commons/inputs/Base/index.vue'
import { defineProps, PropType, ref } from 'vue'
import dayjs from 'dayjs'
import useStore from '@/store'
import { ScheduleActionTypes } from '@/store/modules/model/schedule/actions'
import { Schedule, ScheduleUpdateForm } from '@/types/models/Schedule'
import useToast from '@/mixins/useToast'
import CTextarea from '@/components/commons/inputs/Textarea/index.vue'
import CMaterialIcon from '@/components/commons/icons/Material/index.vue'

const props = defineProps({
  schedule: {
    type: Object as PropType<Schedule>,
    required: false, // @TODO: CHANGE TO TRUE
    default: () => {}
  }
})

const store = useStore()
const { showToast } = useToast()

const formRef = ref<HTMLFormElement>()
const modalRef = ref<any>()
const title = ref('')
const date = ref(dayjs().add(1, 'hour').toDate())
const content = ref('')

const initData = () => {
  if (props.schedule) {
    title.value = props.schedule.title || ''
    date.value = dayjs(props.schedule.date).toDate()
    content.value = props.schedule.content || ''
  }
}

const onClickOpenBtn = (cb: () => void) => {
  initData()
  cb()
}

const onClickCreateBtn = async () => {
  try {
    if (props.schedule) {
      const params = {
        id: props.schedule.id,
        title: title.value,
        date: date.value,
      } as ScheduleUpdateForm

      /* Create schedule */
      await store.dispatch(ScheduleActionTypes.UPDATE_SCHEDULE, params)
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
    }
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
