<template>
  <div
    class="tw-h-screen tw-bg-gray-300 tw-relative"
  >
    <c-snackbar-container
      class="tw-absolute tw-right-4 tw-bottom-4 tw-z-10"
    >
      <c-snackbar
        v-for="snackbar in snackbarList"
        :key="snackbar"
        :snackbar="snackbar"
      />
    </c-snackbar-container>
    <base-general-layout-sidebar />
    <div
      class="tw-h-full tw-pl-20 tw-flex tw-flex-col tw-w-full tw-overflow-auto"
    >
      <base-general-layout-appbar />
      <c-main-layout
        class="tw-flex-shrink-0 tw-flex-grow"
      >
        <router-view />
      </c-main-layout>
    </div>
  </div>
</template>
<script
    lang="ts"
>
export default {
  name: 'BaseGeneralLayout',
}
</script>
<script setup lang="ts">
import CMainLayout from '@/components/commons/layouts/Main/index.vue'
import BaseGeneralLayoutSidebar from '@/layouts/generals/Base/components/Sidebar.vue'
import BaseGeneralLayoutAppbar from '@/layouts/generals/Base/components/Appbar.vue'
import CSnackbarContainer from '@/components/commons/Snackbar/components/Container.vue'
import useStore from '@/store'
import { computed } from 'vue'
import CSnackbar from '@/components/commons/Snackbar/index.vue'

const store = useStore()

const snackbarList = computed(() => store.state.application.snackbarList)
</script>
