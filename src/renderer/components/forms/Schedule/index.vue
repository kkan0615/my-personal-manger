<template>
  <q-form
    class="column full-height q-col-gutter-sm"
    @submit="onSubmit"
  >
    <c-row-input>
      <c-row-input-label
        dense
      >
        Days
      </c-row-input-label>
      <c-row-input-content>
        <q-btn-group
          class="q-mb-sm full-width"
          spread
          flat
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
      </c-row-input-content>
    </c-row-input>
    <!-- date -->
    <c-row-input>
      <c-row-input-label>
        Date
      </c-row-input-label>
      <c-row-input-content>
        <q-input
          v-if="!loopDays.length"
          v-model="date"
          outlined
          placeholder="Date"
          class="full-width"
          dense
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
                  @update:model-value="() => onUpdateDate"
                />
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      </c-row-input-content>
    </c-row-input>
    <c-row-input>
      <c-row-input-label>
        Time
      </c-row-input-label>
      <c-row-input-content>
        <q-field
          class="full-width q-pb-sm q-px-none"
        >
          <div
            class="full-width row justify-center items-center q-pa-none"
          >
            <q-select
              v-model="hour"
              outlined
              class="col-grow q-pr-sm"
              placeholder="Hour"
              dense
              hide-dropdown-icon
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
              outlined
              class="col-grow q-px-sm"
              placeholder="Minute"
              dense
              hide-dropdown-icon
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
              outlined
              class="col-grow q-pl-sm"
              placeholder="Second"
              hide-dropdown-icon
              options-dense
              dense
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
        </q-field>
      </c-row-input-content>
    </c-row-input>
    <q-btn-group
      class="q-mb-sm full-width"
      spread
      flat
    >
      <q-btn
        color="primary"
        dense
        @click="onClickIncBtn(4, 'hour')"
      >
        +4h
      </q-btn>
      <q-btn
        color="primary"
        dense
        @click="onClickIncBtn(1, 'hour')"
      >
        +1h
      </q-btn>
      <q-btn
        color="primary"
        dense
        @click="onClickIncBtn(30, 'minute')"
      >
        +30m
      </q-btn>
      <q-btn
        color="primary"
        dense
        @click="onClickIncBtn(10, 'minute')"
      >
        +10m
      </q-btn>
      <q-btn
        color="primary"
        dense
        @click="onClickIncBtn(5, 'minute')"
      >
        +5m
      </q-btn>
    </q-btn-group>
    <c-row-input>
      <c-row-input-label>
        Content
      </c-row-input-label>
      <c-row-input-content>
        <q-input
          v-model="content"
          outlined
          dense
          placeholder="Content"
          autogrow
        />
      </c-row-input-content>
    </c-row-input>
    <div
      class="q-mt-sm q-mt-auto"
    >
      <q-btn
        :loading="isSaveBtnLoading"
        type="submit"
        color="primary"
      >
        save
      </q-btn>
      <q-btn
        type="reset"
        color="primary"
        flat
        class="q-ml-sm"
        @click="initData"
      >
        reset
      </q-btn>
    </div>
  </q-form>
</template>
<script lang="ts">
export default {
  name: 'FormSchedule',
}
</script>
<script setup lang="ts">
import { defineEmits, ref } from 'vue'
import dayjs from 'dayjs'
import { useScheduleStore } from '@/stores/schedule'
import { ScheduleCreateForm } from '@/types/schedules'
import CRowInput from '@/components/commons/inputs/Row/index.vue'
import CRowInputContent from '@/components/commons/inputs/Row/components/Content.vue'
import CRowInputLabel from '@/components/commons/inputs/Row/components/Label.vue'
import { useQuasar } from 'quasar'

const dayOptions = [
  { label: 'sun', value: 0 },
  { label: 'mon', value: 1 },
  { label: 'tue', value: 2 },
  { label: 'wed', value: 3 },
  { label: 'thu', value: 4 },
  { label: 'fri', value: 5 },
  { label: 'sat', value: 6 },
]
const hourOptions = Array.from(Array(24).keys())
const minuteOptions = Array.from(Array(60).keys())
const secondOptions = Array.from(Array(60).keys())

const emits = defineEmits(['finish:save'])

const $q = useQuasar()
const scheduleStore = useScheduleStore()

const qDateProxyRef = ref<any>()

const isSaveBtnLoading = ref(false)
const loopDays = ref<number[]>([])
const date = ref('')
const hour = ref(0)
const minute = ref(0)
const second = ref(0)
const content = ref('')

const initData = () => {
  loopDays.value = []
  date.value = dayjs().format('YYYY/MM/DD')
  hour.value = dayjs().hour()
  minute.value = dayjs().minute()
  second.value = 0
  content.value = ''
}

initData()

const onSubmit = async () => {
  try {
    isSaveBtnLoading.value = true
    /* if it's loop */
    if (loopDays.value.length) {
      await Promise.all(loopDays.value.map(async loopDay => {
        const loopStr = `${second.value} ${minute.value} ${hour.value} * * ${loopDay}`
        console.log(date)
        await scheduleStore.createSchedule({
          isLoop: true,
          loopStr: loopStr,
          day: loopDay,
          hours: hour.value,
          minutes: minute.value,
          seconds: second.value,
          date: dayjs().startOf('date').toDate(),
          content: content.value
        } as ScheduleCreateForm)
      }))
    } else {
      const formatDate = dayjs(date.value)
        .set('hours', hour.value)
        .set('minutes', minute.value)
        .set('seconds', second.value)
      await scheduleStore.createSchedule({
        isLoop: false,
        loopStr: '',
        day: formatDate.day(),
        hours: formatDate.hour(),
        minutes: formatDate.minute(),
        seconds: formatDate.second(),
        date: formatDate.toDate(),
        content: content.value
      } as ScheduleCreateForm)
    }
    /* If success, off the schedule window */
    emits('finish:save')
  } catch (e) {
    console.error(e)
    $q.notify({
      icon: 'report_problem',
      color: 'negative',
      message: 'Fail to save',
      position: 'bottom-right'
    })
  } finally {
    isSaveBtnLoading.value = false
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

const onClickIncBtn = (value:  number, type: 'hour' | 'minute') => {
  if (type === 'hour') {
    hour.value = dayjs().hour() + value >= 24 ? 23 : dayjs().hour() + value
  } else {
    minute.value = (dayjs().minute() + value) >= 60 ? 59 : dayjs().minute() + value
  }
}

const onUpdateDate = () => {
  qDateProxyRef.value.hide()
}
</script>
