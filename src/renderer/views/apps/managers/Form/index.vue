<template>
  <q-page
    padding
  >
    <c-layout-menubar
      :tittle="$route.name"
    />
    <div>
      <q-form
        class="q-col-gutter-sm"
      >
        <!-- name -->
        <c-row-input>
          <c-row-input-label>
            Name
          </c-row-input-label>
          <c-row-input-content>
            <q-input
              v-model="name"
              outlined
              dense
            />
          </c-row-input-content>
        </c-row-input>
        <!-- color -->
        <c-row-input>
          <c-row-input-label>
            Color
          </c-row-input-label>
          <c-row-input-content>
            color input
          </c-row-input-content>
        </c-row-input>
        <!-- color -->
        <c-row-input>
          <c-row-input-label>
            Age
          </c-row-input-label>
          <c-row-input-content
            class="q-pr-sm"
          >
            <q-slider
              v-model="age"
              :min="0"
              :max="100"
              label-always
            />
          </c-row-input-content>
        </c-row-input>

        <!-- color -->
        <c-row-input>
          <c-row-input-label>
            Hello script list
          </c-row-input-label>
          <c-row-input-content
            class="q-col-gutter-sm"
          >
            <div
              v-for="(script, i) in helloScriptList"
              :key="`hello-script-${i}`"
            >
              <app-manager-form-script
                v-model="helloScriptList[i]"
              />
            </div>
            <q-btn
              class="q-mt-sm q-ml-sm"
              color="primary"
              @click="onClickAddHelloScriptBtn"
            >
              Add new script
            </q-btn>
          </c-row-input-content>
        </c-row-input>
      </q-form>
    </div>
  </q-page>
</template>
<script lang="ts">
export default {
  name: 'AppManagerForm',
}
</script>
<script setup lang="ts">
import CLayoutMenubar from '@/components/commons/layouts/Menubar/index.vue'
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import CRowInput from '@/components/commons/inputs/Row/index.vue'
import CRowInputLabel from '@/components/commons/inputs/Row/components/Label.vue'
import CRowInputContent from '@/components/commons/inputs/Row/components/Content.vue'
import { ManagerScriptForm } from '@/types/managers/script'
import AppManagerFormScript from '@/views/apps/managers/Form/components/Script.vue'

const route = useRoute()

const name = ref('')
const color = ref('')
const age = ref(0)
const birthdayScript = ref<ManagerScriptForm>({})
const helloScriptList = ref<ManagerScriptForm[]>([{
  status: 'CREATE'
}]) // @TODO: Delete default value
const scheduleScriptList = ref<ManagerScriptForm[]>([])
const clickScriptList = ref<ManagerScriptForm[]>([])

const isUpdateForm = computed(() => route.name === 'AppManagerUpdateForm')

const initData = () => {
  // update mode
  if (isUpdateForm.value) {
    //  test
  } else {
    // create form
  }
}

const onClickAddHelloScriptBtn = () => {
  helloScriptList.value.push({
    status: 'CREATE'
  })
}
</script>
