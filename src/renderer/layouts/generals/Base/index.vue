<template>
  <div
    class="tw-flex tw-h-screen"
  >
    <c-sidebar-layout
      class="flex-shrink-1 flex-grow-0"
    >
      <c-sidebar-layout-content>
        <c-sidebar-layout-menu-title>
          menu
        </c-sidebar-layout-menu-title>
        <c-sidebar-layout-menu-list>
          <router-link
            :to="{ name: 'Home' }"
          >
            <c-sidebar-layout-menu-item>
              <c-material-icon
                left
              >
                home
              </c-material-icon>
              home
            </c-sidebar-layout-menu-item>
          </router-link>
          <!--     manager menu     -->
          <router-link
            :to="{ name: 'BaseManager' }"
          >
            <c-sidebar-layout-menu-item>
              <c-material-icon
                left
              >
                support_agent
              </c-material-icon>
              manager
            </c-sidebar-layout-menu-item>
          </router-link>
        </c-sidebar-layout-menu-list>
      </c-sidebar-layout-content>
    </c-sidebar-layout>
    <c-main-layout
      class="flex-shrink-0 flex-grow-1"
    >
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
import CSidebarLayoutMenuList from '@/components/commons/layouts/Sidebar/components/MenuList.vue'
import CSidebarLayoutMenuItem from '@/components/commons/layouts/Sidebar/components/MenuItem.vue'
import CSidebarLayoutMenuTitle from '@/components/commons/layouts/Sidebar/components/MenuTItle.vue'
import CMaterialIcon from '@/components/commons/icons/Material/index.vue'
</script>
