<template>
  <q-drawer
    v-model="leftDrawerOpen"
    show-if-above
    side="left"
    bordered
  >
    drawer content will be here
    <!-- drawer content -->
  </q-drawer>
</template>
<script lang="ts">
export default {
  name: 'AppDrawer',
}
</script>
<script setup lang="ts">
import { ref } from 'vue'

const leftDrawerOpen = ref(true)
</script>
