<template>
  <div
    class="tw-h-screen tw-bg-gray-300"
  >
    <base-general-layout-sidebar />
    <div
      class="tw-h-full tw-pl-20 tw-flex tw-flex-col tw-w-full tw-overflow-auto"
    >
      <c-appbar-layout
        :height="12"
        class="tw-flex-shrink-0 tw-flex-grow-0 tw-border-b tw-bg-white"
      >
        test
      </c-appbar-layout>
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
import CSidebarLayout from '@/components/commons/layouts/Sidebar/index.vue'
import CAppbarLayout from '@/components/commons/layouts/Appbar/index.vue'
import BaseGeneralLayoutSidebar from '@/layouts/generals/Base/components/Sidebar.vue'

</script>
