<template>
  <div
    class="q-pa-md window-height"
  >
    <q-form
      class="column full-height"
      @submit="onSubmit"
    >
      <c-row-input>
        <c-row-input-label>
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
          label
        </c-row-input-label>
        <c-row-input-content>
          <q-input
            v-if="!loopDays.length"
            v-model="date"
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
                    @update:model-value="() => $refs.qDateProxyRef.hide()"
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
            class="full-width q-pb-sm"
          >
            <div
              class="full-width row justify-center items-center q-mb-sm"
            >
              <q-select
                v-model="hour"
                class="col-grow q-pr-sm"
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
                class="col-grow q-px-sm"
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
                class="col-grow q-pl-sm"
                hide-dropdown-icon
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
          content
        </c-row-input-label>
        <c-row-input-content>
          <q-input
            v-model="content"
            dense
            autogrow
          />
        </c-row-input-content>
      </c-row-input>
      <div
        class="q-mt-sm q-mt-auto"
      >
        <q-btn
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
        >
          reset
        </q-btn>
      </div>
    </q-form>
  </div>
</template>
<script lang="ts">
export default {
  name: 'ScheduleMain',
}
</script>
<script setup lang="ts">
import { ref } from 'vue'
import dayjs from 'dayjs'
import { ipcRenderer } from '@/utils/electron'
import { useScheduleStore } from '@/stores/schedule'
import { ScheduleCreateForm } from '@/types/schedules'
import CRowInput from '@/components/commons/inputs/Row/index.vue'
import CRowInputContent from '@/components/commons/inputs/Row/components/Content.vue'
import CRowInputLabel from '@/components/commons/inputs/Row/components/Label.vue'

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

const scheduleStore = useScheduleStore()

const isOpen = ref(false)
const loopDays = ref<number[]>([])
const date = ref(dayjs().format('YYYY/MM/DD'))
const hour = ref(dayjs().hour())
const minute = ref(dayjs().minute())
const second = ref(0)
const content = ref('')

const onSubmit = () => {
  console.log('onSubmit')
  if (loopDays.value.length) {
    Promise.all(loopDays.value.map(loopDay => {
      const date = `${second.value} ${minute.value} ${hour.value} * * ${loopDay}`
      console.log(date)
      scheduleStore.createSchedule({
        isLoop: true,
        date,
        content: content.value
      } as ScheduleCreateForm)
    }))
  } else {
    scheduleStore.createSchedule({
      isLoop: false,
      date: dayjs(date.value)
        .set('hours', hour.value)
        .set('minutes', minute.value)
        .set('seconds', second.value)
        .toDate(),
      content: content.value
    } as ScheduleCreateForm)
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

</script>
<style
    lang="scss"
>
.q-dialog__backdrop {
  display: none;
}
</style>
