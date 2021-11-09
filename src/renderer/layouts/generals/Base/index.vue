<template>
  <div
    class="tw-flex tw-h-screen"
  >
    <c-sidebar-layout>
      <c-sidebar-layout-content>
        Menu
      </c-sidebar-layout-content>
    </c-sidebar-layout>
    <c-main-layout>
      <router-view />
    </c-main-layout>
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
import CSidebarLayoutContent from '@/components/commons/layouts/Sidebar/components/Content.vue'
</script>
