<template>
  <q-drawer
    :width="250"
    :model-value="windowStore.IsOpenAppWindowDrawer"
    show-if-above
    side="left"
    bordered
    class="bg-grey-10 text-white"
    @update:model-value="onUpdateModelValue"
  >
    <q-list
      bordered
      separator
    >
      <q-item
        :to="{ name: 'AppManagerMain' }"
        clickable
        exact
      >
        <q-item-section avatar>
          <q-icon name="manage_accounts" />
        </q-item-section>
        <q-item-section>Manager</q-item-section>
      </q-item>
      <q-item
        :to="{ name: 'AppScheduleMain' }"
        clickable
        exact
      >
        <q-item-section avatar>
          <q-icon name="schedule" />
        </q-item-section>
        <q-item-section>Schedule</q-item-section>
      </q-item>
      <q-item
        :to="{ name: 'AppSettingMain' }"
        clickable
        exact
      >
        <q-item-section avatar>
          <q-icon name="settings" />
        </q-item-section>
        <q-item-section>Setting</q-item-section>
      </q-item>
    </q-list>
  </q-drawer>
</template>
<script lang="ts">
export default {
  name: 'AppDrawer',
}
</script>
<script setup lang="ts">
import { useWindowStore } from '@/stores/windwos'

const windowStore = useWindowStore()

const onUpdateModelValue = (isOpen: boolean) => {
  windowStore.setIsOpenAppWindowDrawer(isOpen)
}
</script>
