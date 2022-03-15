<template>
  <q-page
    padding
  >
    <c-layout-menubar
      :tittle="$route.name"
    />
    <div
      class="row"
    >
      <app-manager-main-current-manager
        class="q-mr-sm"
        style="width: 350px;"
      />
      <q-card
        class="col-grow q-ml-sm"
      >
        <q-card-section
          class="text-h6 q-py-sm"
        >
          Manager List
        </q-card-section>
        <q-separator />
        <q-card-section>
          <div
            class="row q-gutter-sm"
          >
            <app-manager-main-manager-item
              v-for="manager in managerStore.ManagerList"
              :key="manager.id"
              class="col-xs-12 col-sm-12 col-md-4 col-lg-3"
              :manager="manager"
            />
          </div>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>
<script lang="ts">
export default {
  name: 'AppManagerMain',
}
</script>
<script setup lang="ts">
import { computed, ref } from 'vue'
import CLayoutMenubar from '@/components/commons/layouts/Menubar/index.vue'
import { useManagerStore } from '@/stores/manager'
import AppManagerMainCurrentManager from '@/views/apps/managers/Main/components/CurrentManager.vue'
import AppManagerMainManagerItem from '@/views/apps/managers/Main/components/ManagerItem.vue'

const managerStore = useManagerStore()

const src = computed(() => window.URL.createObjectURL(new Blob([managerStore.CurrentManger.main])))

/* Created */
managerStore.loadManagerList({})

const onClickEditBtn = () => {
  console.log('onClickEditBtn')
}

const onClickOpenManagerAppBtn = () => {
  console.log('onClickEditBtn')
}
</script>
