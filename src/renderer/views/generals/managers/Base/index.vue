<template>
  <div>
    <c-header-layout
      title="test"
    />
  </div>
</template>
<script
    lang="ts"
>
export default {
  name: 'BaseMangerGeneral',
}
</script>
<script setup lang="ts">
import { ref } from 'vue'
import CHeaderLayout from '@/components/commons/layouts/Header/index.vue'
</script>
