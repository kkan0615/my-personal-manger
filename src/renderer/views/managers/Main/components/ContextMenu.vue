<template>
  <q-menu
    touch-position
    context-menu
    @update:model-value="onUpdateModelValue"
  >
    <q-list
      dense
      @mouseenter="throughOff"
      @mousemove="throughOff"
    >
      <q-item
        clickable
      >
        <q-item-section>Schedule</q-item-section>
        <q-item-section side>
          <q-icon name="keyboard_arrow_right" />
        </q-item-section>

        <q-menu
          anchor="top end"
          self="top start"
        >
          <q-list
            dense
          >
            <q-item
              v-close-popup
              dense
              clickable
              @click="onClickTodoItem"
            >
              <q-item-section>New Schedule</q-item-section>
            </q-item>
            <q-separator />
            <q-item
              v-close-popup
              clickable
              disable
              @click="onClickMoveItem"
            >
              <q-item-section>
                Previous Schedule
                <q-tooltip>
                  Not open yet
                </q-tooltip>
              </q-item-section>
            </q-item>
            <q-separator />
            <q-item
              v-close-popup
              clickable
              disable
            >
              <q-item-section>
                Next Schedule
                <q-tooltip>
                  Not open yet
                </q-tooltip>
              </q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-item>
      <!-- Create schedule -->
      <!--      <schedule-form-dialog />-->
      <q-separator />
      <q-item
        clickable
      >
        <q-item-section>Config</q-item-section>
        <q-item-section side>
          <q-icon name="keyboard_arrow_right" />
        </q-item-section>

        <q-menu
          anchor="top end"
          self="top start"
        >
          <q-list
            dense
          >
            <q-item
              v-close-popup
              clickable
              disable
            >
              <q-item-section>
                Only Event
                <q-tooltip>
                  Not open yet
                </q-tooltip>
              </q-item-section>
            </q-item>
            <q-separator />
            <q-item
              v-close-popup
              clickable
              @click="onClickMoveItem"
            >
              <q-item-section>Move Position</q-item-section>
            </q-item>
            <q-separator />
            <q-item
              v-close-popup
              clickable
              disable
            >
              <q-item-section>
                Volume
                <q-tooltip>
                  Not open yet
                </q-tooltip>
              </q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-item>
      <q-separator />
      <q-item
        v-close-popup
        clickable
      >
        <q-item-section>Close</q-item-section>
      </q-item>
    </q-list>
  </q-menu>
</template>
<script lang="ts">
export default {
  name: 'ManagerMainContextMenu',
}
</script>
<script setup lang="ts">
import { useManagerStore } from '@/stores/manager'
import { ipcRenderer } from '@/utils/electron'

const managerStore = useManagerStore()

const onUpdateModelValue = (value: any) => {
  console.log(value)
}

const onClickMoveItem = () => {
  managerStore.setCurrentManagerConfig({
    ...managerStore.CurrentMangerConfig,
    isPossibleMove: true,
  })
}

const throughOff = () => {
  ipcRenderer.send('through-off-manager-window')
}

const onClickTodoItem = () => {
  ipcRenderer.send('open-schedule-window')
}
</script>
