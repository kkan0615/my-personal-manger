<template>
  <q-card-section>
    <div
      class="row full-width"
    >
      <q-card
        flat
        bordered
      >
        <q-img
          width="350px"
          class="full-height"
          :src="src"
        />
      </q-card>
      <div
        class="col-grow full-height scroll-y"
      >
        <!-- information -->
        <div
          class="text-subtitle1"
        >
          Information
        </div>
        <!-- name -->
        <c-row-input>
          <c-row-input-label
            dense
          >
            Name
          </c-row-input-label>
          <c-row-input-content>
            {{ manager.name }}
          </c-row-input-content>
        </c-row-input>
        <!-- color -->
        <c-row-input>
          <c-row-input-label dense>
            Color
          </c-row-input-label>
          <c-row-input-content>
            <q-badge
              :color="manager.color"
            />
          </c-row-input-content>
        </c-row-input>
        <!-- color -->
        <c-row-input>
          <c-row-input-label dense>
            Age
          </c-row-input-label>
          <c-row-input-content>
            {{ manager.age }}
          </c-row-input-content>
        </c-row-input>
        <!-- Hello scripts -->
        <div
          class="q-mt-sm text-subtitle1"
        >
          Hello Scripts
        </div>
        <div
          class="q-col-gutter-sm"
        >
          <div
            v-for="(script, i) in manager.helloScriptList"
            :key="`hello-script-${i}`"
          >
            <app-manager-main-script
              :script="script"
            />
          </div>
        </div>
        <!-- click scripts -->
        <div
          class="q-mt-sm text-subtitle1"
        >
          Click Scripts
        </div>
        <div
          class="q-col-gutter-sm"
        >
          <div
            v-for="(script, i) in manager.clickScriptList"
            :key="`click-script-${i}`"
          >
            <app-manager-main-script
              :script="script"
            />
          </div>
        </div>
        <!-- schedule scripts -->
        <div
          class="q-mt-sm text-subtitle1"
        >
          Schedule Scripts
        </div>
        <div
          class="q-col-gutter-sm"
        >
          <div
            v-for="(script, i) in manager.scheduleScriptList"
            :key="`schedule-script-${i}`"
          >
            <app-manager-main-script
              :script="script"
            />
          </div>
        </div>
        <!-- birthday script -->
        <div
          class="q-mt-sm text-subtitle1"
        >
          Birthday Script
        </div>
        <app-manager-main-script
          :script=" manager.birthdayScript"
        />
      </div>
    </div>
  </q-card-section>
</template>
<script lang="ts">
export default {
  name: 'AppManagerMainManagerDetail',
}
</script>
<script setup lang="ts">
import { computed, defineProps, PropType } from 'vue'
import AppManagerMainScript from '@/views/apps/managers/Main/components/Script.vue'
import CRowInput from '@/components/commons/inputs/Row/index.vue'
import CRowInputLabel from '@/components/commons/inputs/Row/components/Label.vue'
import CRowInputContent from '@/components/commons/inputs/Row/components/Content.vue'
import { ManagerInfo } from '@/types/managers'

const props = defineProps({
  manager: {
    type: Object as PropType<ManagerInfo>,
    required: true,
    default: () => {}
  }
})

const src = computed(() => props.manager ? window.URL.createObjectURL(new Blob([props.manager.main])) : '')
</script>
