<template>
  <q-page
    padding
  >
    <c-layout-menubar
      tittle="Setting"
    />
    <div>
      <div
        class="text-h6"
      >
        Master info
      </div>
      <q-form
        class="q-col-gutter-sm"
        @submit="onSubmit"
      >
        <q-input
          v-model="masterName"
          outlined
          label="Master name"
          dense
        />
        <q-input
          v-model="birthday"
          outlined
          placeholder="Date"
          class="full-width"
          dense
          mask="date"
          label="birthday"
          :rules="['date']"
        >
          <template #append>
            <q-icon
              size="xs"
              name="event"
              class="cursor-pointer"
            >
              <q-popup-proxy
                ref="qDateProxyRef"
                transition-show="scale"
                transition-hide="scale"
              >
                <q-date
                  v-model="birthday"
                  @update:model-value="() => onUpdateDate"
                />
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
        <div>
          <q-btn
            :loading="isSaveBtnLoading"
            type="submit"
            color="primary"
          >
            save
          </q-btn>
          <q-btn
            type="reset"
            color="primary"
            flat
            class="q-ml-sm"
            @click="initData"
          >
            reset
          </q-btn>
        </div>
      </q-form>
    </div>
  </q-page>
</template>
<script lang="ts">
export default {
  name: 'AppSettingMain',
}
</script>
<script setup lang="ts">
import CLayoutMenubar from '@/components/commons/layouts/Menubar/index.vue'
import { ref } from 'vue'
import dayjs from 'dayjs'
import { useMasterStore } from '@/stores/master'
import { useQuasar } from 'quasar'

const masterStore = useMasterStore()
const $q = useQuasar()

const qDateProxyRef = ref<any>()

const isSaveBtnLoading = ref(false)
const masterName = ref('')
const birthday = ref('')

const initData = () => {
  masterName.value = masterStore.MasterConfig.name
  birthday.value = dayjs(masterStore.MasterConfig.birthday).format('YYYY/MM/DD')
}

initData()

const onUpdateDate = () => {
  qDateProxyRef.value.hide()
}

const onSubmit = async () => {
  try {
    isSaveBtnLoading.value = true
    await masterStore.updateMaster({
      name: masterName.value,
      birthday: birthday.value,
    })
    await masterStore.loadMaster()
    $q.notify({
      message: 'Success to change current manager',
      position: 'bottom-right'
    })
  } catch (e) {
    console.error(e)
    $q.notify({
      icon: 'report_problem',
      color: 'negative',
      message: 'Fail to change',
      position: 'bottom-right'
    })
  } finally {
    isSaveBtnLoading.value = false
  }
}
</script>
