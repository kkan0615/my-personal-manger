<template>
  <q-item
    clickable
    @click="onClickTodoItem"
  >
    <q-item-section>New Todo</q-item-section>
  </q-item>
  <q-dialog
    v-model="isOpen"
    full-width
    @mouseenter="throughOff"
    @mousemove="throughOff"
  >
    <q-card
      style="height: 300px;"
    >
      <q-card-section class="row items-center q-pb-none">
        <div>
          schedule
        </div>
        <q-space />
        <q-btn
          v-close-popup
          icon="close"
          size="sm"
          flat
          round
          dense
        />
      </q-card-section>

      <q-card-section
        class="q-py-sm"
      >
        <q-form
          @submit="onSubmit"
        >
          <div
            class="q-mb-sm"
          >
            <q-btn-toggle
              v-model="loopDay"
              dense
              toggle-color="primary"
              flat
              :options="[
                {label: 'sun', value: 'sunday'},
                {label: 'mon', value: 'monday'},
                {label: 'tue', value: 'tuesday'},
                {label: 'wed', value: 'wednesday'},
                {label: 'fri', value: 'friday'},
                {label: 'thu', value: 'thursday'},
                {label: 'sat', value: 'saturday'},
              ]"
            />
          </div>
          <!-- date -->
          <q-input
            v-model="date"
            class="full-width"
            dense
            outlined
            mask="date"
            :rules="['date']"
          >
            <template #append>
              <q-icon
                size="xs"
                name="event"
                class="cursor-pointer"
              >
                <q-popup-proxy
                  ref="qDateProxyRef"
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-date
                    v-model="date"
                    @update:model-value="() => $refs.qDateProxyRef.hide()"
                  />
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
          <div
            class="row justify-center items-center q-mb-sm"
          >
            <q-select
              v-model="hour"
              dense
              options-dense
              :options="hourOptions"
            />
            <q-select
              v-model="minute"
              dense
              options-dense
              :options="minuteOptions"
            />
            <q-select
              v-model="second"
              dense
              options-dense
              :options="secondOptions"
            />
          </div>
          <q-input
            v-model="content"
            outlined
            dense
            autogrow
          />
        </q-form>
        <div
          class="q-mt-sm"
        >
          <q-btn
            type="submit"
            size="sm"
            color="primary"
          >
            save
          </q-btn>
          <q-btn
            type="reset"
            size="sm"
            color="primary"
            flat
            class="q-ml-sm"
          >
            reset
          </q-btn>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<script lang="ts">
export default {
  name: 'ScheduleFormDialog',
}
</script>
<script setup lang="ts">
import { ref } from 'vue'
import dayjs from 'dayjs'
import { ipcRenderer } from '@/utils/electron'

const isOpen = ref(false)
const loopDay = ref('sunday')
const date = ref(dayjs().format('yyyy-MM-dd'))
const hour = ref(dayjs().hour())
const minute = ref(dayjs().minute())
const second = ref(dayjs().second())
const content = ref('')

const hourOptions = Array.from(Array(24).keys())
const minuteOptions = Array.from(Array(60).keys())
const secondOptions = Array.from(Array(60).keys())

const onClickTodoItem = () => {
  isOpen.value = true
}

const throughOff = () => {
  ipcRenderer.send('through-off-manager-window')
}

const onSubmit = () => {
  console.log('onSubmit')
}

</script>
<style
  lang="scss"
>
.q-dialog__backdrop {
  display: none;
}
</style>
