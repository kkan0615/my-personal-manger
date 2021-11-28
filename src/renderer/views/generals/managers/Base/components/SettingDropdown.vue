<template>
  <div class="dropdown">
    <button
      id="dropdownMenuButton1"
      type="button"
      data-bs-toggle="dropdown"
      aria-expanded="false"
    >
      <c-material-icon>
        settings
      </c-material-icon>
    </button>
    <ul
      class="dropdown-menu"
      aria-labelledby="dropdownMenuButton1"
    >
      <li
        @click="onClickResetToDefaultBtn"
      >
        <div
          class="dropdown-item tw-cursor-pointer"
        >
          Reset to default
        </div>
      </li>
    </ul>
  </div>
</template>
<script lang="ts">
export default {
  name: 'BaseMangerSettingDropdown',
}
</script>
<script setup lang="ts">
import CMaterialIcon from '@/components/commons/icons/Material/index.vue'
import useStore from '@/store'
import { ManagerActionTypes } from '@/store/modules/model/manager/actions'
import useToast from '@/mixins/useToast'
import { CurrentActionTypes } from '@/store/modules/systems/current/actions'

const store = useStore()
const { showToast } = useToast()

const onClickResetToDefaultBtn = async () => {
  try {
    await store.dispatch(ManagerActionTypes.CLEAR_MANAGER_ID)
    await store.dispatch(CurrentActionTypes.RESET_MANAGER)
    await store.dispatch(CurrentActionTypes.LOAD_MANAGER)

    showToast({
      title: 'Success',
      content: 'Success to change',
      type: 'success'
    })
  } catch (e) {
    console.error(e)
  }
}
</script>
