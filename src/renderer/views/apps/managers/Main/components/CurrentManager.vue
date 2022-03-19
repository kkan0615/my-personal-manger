<template>
  <q-card>
    <q-card-section
      class="q-py-sm"
    >
      <div
        class="text-h6"
      >
        Current Manager
      </div>
    </q-card-section>
    <q-separator />
    <q-card-section
      class="q-py-sm"
    >
      <div
        class="text-right q-gutter-sm"
      >
        <q-btn
          round
          color="primary"
          icon="edit"
          size="sm"
          @click="onClickEditBtn"
        >
          <q-tooltip>
            Edit current manager
          </q-tooltip>
        </q-btn>
        <q-btn
          round
          color="primary"
          icon="manager"
          size="sm"
        >
          <q-tooltip>
            Open manager app
          </q-tooltip>
        </q-btn>
      </div>
    </q-card-section>
    <div>
      <q-img
        width="350px"
        height="400px"
        :src="src"
      />
    </div>
    <q-separator />
    <q-card-section>
      <!-- name -->
      <c-row-input>
        <c-row-input-label dense>
          Name
        </c-row-input-label>
        <c-row-input-content>
          {{ managerStore.CurrentManger.name }}
        </c-row-input-content>
      </c-row-input>
      <!-- color -->
      <c-row-input>
        <c-row-input-label dense>
          Color
        </c-row-input-label>
        <c-row-input-content>
          <q-badge
            :color="managerStore.CurrentManger.color"
          />
        </c-row-input-content>
      </c-row-input>
      <!-- color -->
      <c-row-input>
        <c-row-input-label dense>
          Age
        </c-row-input-label>
        <c-row-input-content>
          {{ managerStore.CurrentManger.age }}
        </c-row-input-content>
      </c-row-input>
    </q-card-section>
  </q-card>
</template>
<script lang="ts">
export default {
  name: 'AppManagerMainCurrentManager',
}
</script>
<script setup lang="ts">
import { useManagerStore } from '@/stores/manager'
import { computed } from 'vue'
import CRowInput from '@/components/commons/inputs/Row/index.vue'
import CRowInputLabel from '@/components/commons/inputs/Row/components/Label.vue'
import CRowInputContent from '@/components/commons/inputs/Row/components/Content.vue'

const managerStore = useManagerStore()

const src = computed(() => window.URL.createObjectURL(new Blob([managerStore.CurrentManger.main])))

const onClickEditBtn = () => {
  console.log('onClickEditBtn')
}

const onClickOpenManagerAppBtn = () => {
  console.log('onClickOpenManagerAppBtn')
}
</script>
