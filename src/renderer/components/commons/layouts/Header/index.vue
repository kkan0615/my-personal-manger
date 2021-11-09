<template>
  <div
    class="tw-flex"
  >
    <div
      class="tw-font-bold"
    >
      {{ title }}
    </div>
    <nav
      class="tw-ml-auto"
      aria-label="breadcrumb"
    >
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <a href="#">Home</a>
        </li>
        <li class="breadcrumb-item">
          <a href="#">Library</a>
        </li>
        <li
          class="breadcrumb-item active"
          aria-current="page"
        >
          Data
        </li>
      </ol>
    </nav>
  </div>
</template>
<script
    lang="ts"
>
export default {
  name: 'CHeaderLayout',
}
</script>
<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps({
  title: {
    type: String,
    required: false,
    default: '',
  },
})
</script>
