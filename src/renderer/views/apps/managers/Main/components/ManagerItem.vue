<template>
  <q-card
    @click="onClickCard"
  >
    <q-dialog
      v-model="isOpenDetail"
    >
      <q-card
        style="width: 450px; max-width: 80vw;"
      >
        <q-card-section class="row full-width items-center q-py-sm col-shrink bg-primary text-white">
          <div class="text-h6">
            {{ manager.name }}
          </div>
          <q-space />
          <q-btn
            v-close-popup
            icon="close"
            flat
            round
            dense
          />
        </q-card-section>
        <app-manager-main-manager-detail
          class="col-grow"
          :manager="manager"
        />
      </q-card>
    </q-dialog>
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
      class="q-pa-sm row"
    >
      <q-badge
        v-if="managerStore.CurrentManger.id === manager.id"
      >
        current
      </q-badge>
      <div
        class="q-ml-auto q-gutter-sm "
      >
        <q-btn
          :disable="managerStore.CurrentManger.id === 'default'"
          round
          color="primary"
          icon="edit"
          size="sm"
          @click="onClickEditBtn"
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
          @click.stop="onClickSetManagerBtn"
        >
          <q-tooltip>
            Set manager
          </q-tooltip>
        </q-btn>
      </div>
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
import { ManagerInfo } from '@main/types/managers'
import CRowInput from '@/components/commons/inputs/Row/index.vue'
import CRowInputLabel from '@/components/commons/inputs/Row/components/Label.vue'
import CRowInputContent from '@/components/commons/inputs/Row/components/Content.vue'
import { useManagerStore } from '@/stores/manager'
import AppManagerMainManagerDetail from '@/views/apps/managers/Main/components/ManagerDetail.vue'
import { useQuasar } from 'quasar'
import { useRouter } from 'vue-router'

const props = defineProps({
  manager: {
    type: Object as PropType<ManagerInfo>,
    required: true,
    default: () => {}
  }
})

const $q = useQuasar()
const router = useRouter()
const managerStore = useManagerStore()

const isOpenDetail = ref(false)

const src = computed(() => props.manager ? window.URL.createObjectURL(new Blob([props.manager.main])) : '')

const onClickEditBtn = () => {
  if (props.manager) {
    router.push({ name: 'AppManagerUpdateForm', params: { id: props.manager.id } })
  }
}

const onClickSetManagerBtn = async () => {
  try {
    if (props.manager) {
      await managerStore.changeCurrentManager(props.manager.id)
      await managerStore.loadCurrentManager()
      $q.notify({
        message: 'Success to change current manager',
        position: 'bottom-right'
      })
    }
  } catch (e) {
    console.error(e)
    $q.notify({
      icon: 'report_problem',
      color: 'negative',
      message: 'Fail to change',
      position: 'bottom-right'
    })
  }
}

const onClickCard = () => {
  isOpenDetail.value = true
}
</script>
