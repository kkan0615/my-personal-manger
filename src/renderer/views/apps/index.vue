<template>
  <q-layout view="lHh lpR fFf">
    <q-header
      elevated
      class="bg-white text-black"
    >
      <q-toolbar>
        <q-btn
          dense
          flat
          round
          icon="menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title
          @click="onClickTitle"
        >
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
          </q-avatar>
          Title
        </q-toolbar-title>
      </q-toolbar>
    </q-header>
    <app-drawer />
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
<script lang="ts">
export default {
  name: 'AppLayout',
}
</script>
<script setup lang="ts">

import AppDrawer from '@/views/apps/components/Drawer.vue'
import { useWindowStore } from '@/stores/windwos'
import { useRouter } from 'vue-router'

const router = useRouter()
const windowStore = useWindowStore()

const toggleLeftDrawer = () => {
  windowStore.setIsOpenAppWindowDrawer(!windowStore.IsOpenAppWindowDrawer)
}

const onClickTitle = () => {
  router.push({
    name: 'AppHome'
  })
}

</script>
