<template>
  <q-card>
    <q-card-section>
      <div>
        <q-img
          fit="contain"
          :src="src"
        />
      </div>
    </q-card-section>
    <q-separator />
    <q-card-section>
      <!-- name -->
      <c-row-input>
        <c-row-input-label>
          Name
        </c-row-input-label>
        <c-row-input-content>
          {{ manager.name }}
        </c-row-input-content>
      </c-row-input>
      <!-- color -->
      <c-row-input>
        <c-row-input-label>
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
        <c-row-input-label>
          Age
        </c-row-input-label>
        <c-row-input-content>
          {{ manager.age }}
        </c-row-input-content>
      </c-row-input>
    </q-card-section>
    <q-separator />
    <q-card-section
      class="text-right q-gutter-sm q-py-sm"
    >
      <q-btn
        round
        color="primary"
        icon="edit"
        size="sm"
        @click="onClickSetManagerBtn"
      >
        <q-tooltip>
          Edit manager
        </q-tooltip>
      </q-btn>
      <q-btn
        round
        :disable="managerStore.CurrentManger.id === manager.id"
        color="primary"
        icon="published_with_changes"
        size="sm"
        @click="onClickSetManagerBtn"
      >
        <q-tooltip>
          Set manager
        </q-tooltip>
      </q-btn>
    </q-card-section>
  </q-card>
</template>
<script lang="ts">
export default {
  name: 'AppManagerMainManagerItem',
}
</script>
<script setup lang="ts">
import { computed, defineProps, PropType, ref } from 'vue'
import { Manager } from '@main/types/managers'
import CRowInput from '@/components/commons/inputs/Row/index.vue'
import CRowInputLabel from '@/components/commons/inputs/Row/components/Label.vue'
import CRowInputContent from '@/components/commons/inputs/Row/components/Content.vue'
import { useManagerStore } from '@/stores/manager'

const props = defineProps({
  manager: {
    type: Object as PropType<Manager>,
    required: true,
    default: () => {}
  }
})

const managerStore = useManagerStore()

const src = computed(() => props.manager ? window.URL.createObjectURL(new Blob([props.manager.main])) : '')


const onClickSetManagerBtn = () => {
  console.log('onClickSetManagerBtn')
}
</script>
