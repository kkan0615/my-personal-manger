<template>
  <div>
    main page
    {{ $route.name }}
  </div>
</template>
<script lang="ts">
export default {
  name: 'AppScheduleMain',
}
</script>
<script setup lang="ts">
import { ref } from 'vue'
</script>
