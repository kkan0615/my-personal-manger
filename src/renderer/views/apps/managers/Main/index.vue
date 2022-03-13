<template>
  <q-page
    padding
  >
    <c-layout-menubar
      :tittle="$route.name"
    />
    {{ $route.name }}
  </q-page>
</template>
<script lang="ts">
export default {
  name: 'AppManagerMain',
}
</script>
<script setup lang="ts">
import { ref } from 'vue'
import CLayoutMenubar from '@/components/commons/layouts/Menubar/index.vue'
</script>
