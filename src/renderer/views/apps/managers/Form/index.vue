<template>
  <q-page
    padding
  >
    <c-layout-menubar
      :tittle="$route.name"
    />
    <div>
      {{ $route.name }}
      {{ $route.params }}
    </div>
  </q-page>
</template>
<script lang="ts">
export default {
  name: 'AppManagerForm',
}
</script>
<script setup lang="ts">
import { ref } from 'vue'
import CLayoutMenubar from '@/components/commons/layouts/Menubar/index.vue'
</script>
