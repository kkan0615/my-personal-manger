<template>
  <c-sidebar-layout
    mini
    class="tw-fixed tw-z-50 tw-left-0 tw-top-0"
  >
    <c-sidebar-layout-content>
      <c-sidebar-layout-menu-title>
        menu
      </c-sidebar-layout-menu-title>
      <c-sidebar-layout-menu-list>
        <router-link
          :to="{ name: 'Home' }"
        >
          <c-sidebar-layout-menu-item
            class="tw-text-2xl"
          >
            <c-material-icon
              class="tw-text-2xl"
            >
              home
            </c-material-icon>
            <span
              class="c-sidebar-menu-item--title"
            >
              home
            </span>
          </c-sidebar-layout-menu-item>
        </router-link>
        <!--     manager menu     -->
        <router-link
          :to="{ name: 'BaseManager' }"
        >
          <c-sidebar-layout-menu-item
            class="tw-text-2xl"
          >
            <c-material-icon
              class="tw-text-2xl"
            >
              support_agent
            </c-material-icon>
            <span
              class="c-sidebar-menu-item--title"
            >
              manager
            </span>
          </c-sidebar-layout-menu-item>
        </router-link>
      </c-sidebar-layout-menu-list>
    </c-sidebar-layout-content>
  </c-sidebar-layout>
</template>
<script
  lang="ts"
>
export default {
  name: 'BaseGeneralLayoutSidebar',
}
</script>
<script setup lang="ts">
import CSidebarLayout from '@/components/commons/layouts/Sidebar/index.vue'
import CSidebarLayoutContent from '@/components/commons/layouts/Sidebar/components/Content.vue'
import CSidebarLayoutMenuList from '@/components/commons/layouts/Sidebar/components/MenuList.vue'
import CSidebarLayoutMenuItem from '@/components/commons/layouts/Sidebar/components/MenuItem.vue'
import CSidebarLayoutMenuTitle from '@/components/commons/layouts/Sidebar/components/MenuTItle.vue'
import CMaterialIcon from '@/components/commons/icons/Material/index.vue'

</script>
