<template>
  <div class="dropdown">
    <button
      id="dropdownMenuButton1"
      type="button"
      data-bs-toggle="dropdown"
      aria-expanded="false"
      @click.prevent.stop
    >
      <c-material-icon
        class="text-primary"
      >
        more_horiz
      </c-material-icon>
    </button>
    <ul
      class="dropdown-menu tw-divide-y-2 full-manager-dropdown-menu-list"
      aria-labelledby="dropdownMenuButton1"
    >
      <li
        v-if="!config.isAlwaysTop"
        class="dropdown-item full-manager-dropdown-menu-list-item"
        @click="onClickOnAlwaysTheTop"
      >
        on always on the top
      </li>
      <li
        v-else
        class="dropdown-item full-manager-dropdown-menu-list-item"
        @click="onClickOffAlwaysTheTop"
      >
        off always on the top
      </li>
    </ul>
  </div>
</template>
<script lang="ts">
export default {
  name: 'FullManagerDropdownMenu',
}
</script>
<script setup lang="ts">
import CMaterialIcon from '@/components/commons/icons/Material/index.vue'
import { computed } from 'vue'
import useStore from '@/store'
import useElectron from '@/mixins/useElectron'
import { ManagerActionTypes } from '@/store/modules/model/manager/actions'
import { CurrentActionTypes } from '@/store/modules/systems/current/actions'

const { ipcRenderer } = useElectron()
const store = useStore()

const manager = computed(() => store.state.manager.manager)
const config = computed(() => store.state.current.managerConfig)

const onClickOnAlwaysTheTop = async () => {
  ipcRenderer.send('update-manager-config-by-id', {
    id: manager.value.id,
    config: {
      ...config.value,
      isAlwaysTop: true
    }
  })

  await store.dispatch(CurrentActionTypes.LOAD_MANAGER_CONFIG)
}

const onClickOffAlwaysTheTop = async () => {
  ipcRenderer.send('update-manager-config-by-id', {
    id: manager.value.id,
    config: {
      ...config.value,
      isAlwaysTop: false
    }
  })
  await store.dispatch(ManagerActionTypes.LOAD_MANAGER_CONFIG)
}
</script>
<style
  scoped
  lang="scss"
>
.full-manager-dropdown-menu-list {
  .full-manager-dropdown-menu-list-item {
    @apply tw-cursor-pointer hover:tw-bg-gray-400;
  }
}
</style>
