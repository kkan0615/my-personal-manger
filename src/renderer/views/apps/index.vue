<template>
  <q-layout view="hHh lpR lff">
    <q-header
      elevated
      class="bg-primary text-white"
    >
      <q-toolbar>
        <q-btn
          dense
          flat
          round
          icon="menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
          </q-avatar>
          Title
        </q-toolbar-title>
      </q-toolbar>
    </q-header>
    <app-drawer />
    <q-page-container>
      123
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
import { ref } from 'vue'
import AppDrawer from '@/views/apps/components/Drawer.vue'

const toggleLeftDrawer = () => {
  console.log('toggleLeftDrawer')
}
</script>
