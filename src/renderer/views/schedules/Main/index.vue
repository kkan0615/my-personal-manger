<template>
  <div
    class="q-pa-md window-height"
  >
    <q-form
      class="column full-height"
      @submit="onSubmit"
    >
      <q-btn-group
        class="q-mb-sm"
        spread
      >
        <q-btn
          v-for="option in dayOptions"
          :key="option.value"
          dense
          :color="loopDays.includes(option.value) ? 'primary' : undefined"
          class="text-center text-caption"
          @click="onClickDayOptionBtn(option)"
        >
          {{ option.label }}
        </q-btn>
      </q-btn-group>
      <!-- date -->
      <q-input
        v-if="!loopDays.length"
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
          class="col-grow"
          dense
          options-dense
          :options="hourOptions"
          popup-content-style="height: 200px;"
        >
          <template
            #append
          >
            <span
              class="text-subtitle1"
            >
              H
            </span>
          </template>
        </q-select>
        <q-select
          v-model="minute"
          class="col-grow"
          dense
          options-dense
          :options="minuteOptions"
          popup-content-style="height: 200px;"
        >
          <template
            #append
          >
            <span
              class="text-subtitle1"
            >
              M
            </span>
          </template>
        </q-select>
        <q-select
          v-model="second"
          class="col-grow"
          dense
          options-dense
          :options="secondOptions"
          popup-content-style="height: 200px;"
        >
          <template
            #append
          >
            <span
              class="text-subtitle1"
            >
              S
            </span>
          </template>
        </q-select>
      </div>
      <q-input
        v-model="content"
        outlined
        dense
        autogrow
      />
      <div
        class="q-mt-sm q-mt-auto"
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
    </q-form>
  </div>
</template>
<script lang="ts">
export default {
  name: 'ScheduleMain ',
}
</script>
<script setup lang="ts">
import { ref } from 'vue'
import dayjs from 'dayjs'
import { ipcRenderer } from '@/utils/electron'

const dayOptions = [
  { label: 'sun', value: 0 },
  { label: 'mon', value: 1 },
  { label: 'tue', value: 2 },
  { label: 'wed', value: 3 },
  { label: 'fri', value: 4 },
  { label: 'thu', value: 5 },
  { label: 'sat', value: 6 },
]
const hourOptions = Array.from(Array(24).keys())
const minuteOptions = Array.from(Array(60).keys())
const secondOptions = Array.from(Array(60).keys())

const isOpen = ref(false)
const loopDays = ref<number[]>([])
const date = ref(dayjs())
const hour = ref(dayjs().hour())
const minute = ref(dayjs().minute())
const second = ref(dayjs().second())
const content = ref('')

const onClickTodoItem = () => {
  isOpen.value = true
}

const throughOff = () => {
  ipcRenderer.send('through-off-manager-window')
}

const onSubmit = () => {
  console.log('onSubmit')
  if (loopDays.value.length) {
    Promise.all(loopDays.value.map(loopDay => {
      const date = `${second.value} ${minute.value} ${hour.value} * * ${loopDay}`
      console.log(date)
    }))
  }
}

const onClickDayOptionBtn = (option: { label: string; value: number }) => {
  const foundIndex = loopDays.value.findIndex(loopDay => loopDay === option.value)
  if (foundIndex >= 0) {
    loopDays.value.splice(foundIndex, 1)
  } else {
    loopDays.value.push(option.value)
  }
}

</script>
<style
    lang="scss"
>
.q-dialog__backdrop {
  display: none;
}
</style>
