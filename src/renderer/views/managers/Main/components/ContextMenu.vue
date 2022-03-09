<template>
  <q-menu
    touch-position
    context-menu
  >
    <q-list
      dense
      @mouseenter="throughOff"
      @mousemove="throughOff"
    >
      <q-item
        v-close-popup
        clickable
        @click="onClickMoveItem"
      >
        <q-item-section>Move</q-item-section>
      </q-item>
      <q-separator />
      <!-- Create schedule -->
      <schedule-form-dialog />
      <q-separator />
      <q-item clickable>
        <q-item-section>Preferences</q-item-section>
        <q-item-section side>
          <q-icon name="keyboard_arrow_right" />
        </q-item-section>

        <q-menu
          anchor="top end"
          self="top start"
        >
          <q-list>
            <q-item
              v-for="n in 3"
              :key="n"
              dense
              clickable
            >
              <q-item-section>Submenu Label</q-item-section>
              <q-item-section side>
                <q-icon name="keyboard_arrow_right" />
              </q-item-section>
              <q-menu
                auto-close
                anchor="top end"
                self="top start"
              >
                <q-list>
                  <q-item
                    v-for="n in 3"
                    :key="n"
                    dense
                    clickable
                  >
                    <q-item-section>3rd level Label</q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </q-item>
          </q-list>
        </q-menu>
      </q-item>
      <q-separator />
      <q-item
        v-close-popup
        clickable
      >
        <q-item-section>Quit</q-item-section>
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
import ScheduleFormDialog from '@/components/ScheduleFormDialog/index.vue'
import { ipcRenderer } from '@/utils/electron'

const managerStore = useManagerStore()

const onClickMoveItem = () => {
  managerStore.setCurrentManagerSetting({
    ...managerStore.CurrentMangerSetting,
    isPossibleMove: true,
  })
}

const throughOff = () => {
  ipcRenderer.send('through-off-manager-window')
}
</script>
