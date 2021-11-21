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

const onClickResetToDefaultBtn = () => {
  console.log('onClickResetToDefaultBtn')
}
</script>
