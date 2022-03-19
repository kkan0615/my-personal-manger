<template>
  <q-page
    padding
  >
    <c-layout-menubar
      tittle="Manager Form"
    />
    <div>
      <q-form
        class="q-col-gutter-sm"
      >
        <div
          class="text-h6"
        >
          Manager Information
        </div>
        <!-- name -->
        <c-row-input>
          <c-row-input-label>
            Name
          </c-row-input-label>
          <c-row-input-content>
            <q-input
              v-model="name"
              placeholder="name"
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
            <c-color-picker
              v-model="color"
              dense
              outlined
            />
          </c-row-input-content>
        </c-row-input>
        <!-- color -->
        <c-row-input>
          <c-row-input-label>
            Age
          </c-row-input-label>
          <c-row-input-content
            class="q-pr-sm row items-center"
          >
            <b
              class="col-1"
            >
              {{ age }}
            </b>
            <q-slider
              v-model="age"
              class="col-11"
              :min="0"
              :max="100"
            />
          </c-row-input-content>
        </c-row-input>
        <!-- helloScriptList -->
        <div
          class="q-mt-sm q-col-gutter-sm"
        >
          <div
            class="text-h6"
          >
            Manager Script
          </div>
          <div
            class="text-subtitle1"
          >
            Hello script list
            <app-manager-form-script-helper />
          </div>
          <div
            v-for="(script, i) in helloScriptList"
            :key="`hello-script-${i}`"
          >
            <div
              class="row q-col-gutter-sm items-center"
            >
              <div
                class="text-subtitle1"
              >
                {{ i + 1 }}.
              </div>
              <app-manager-form-script
                v-model="helloScriptList[i]"
                class="col-grow"
              />
              <q-btn
                class="col-shrink"
                flat
                rounded
                color="negative"
                icon="close"
                dense
                @click="onClickRemoveHelloScriptBtn(i)"
              >
                <q-tooltip>
                  Remove
                </q-tooltip>
              </q-btn>
            </div>
          </div>
          <div>
            <q-btn
              color="primary"
              size="sm"
              @click="onClickAddHelloScriptBtn"
            >
              Add new script
            </q-btn>
          </div>
        </div>
        <!-- click schedule list -->
        <div
          class="q-mt-sm q-col-gutter-sm"
        >
          <div
            class="text-subtitle1"
          >
            Click script list
            <app-manager-form-script-helper />
          </div>
          <div
            v-for="(script, i) in clickScriptList"
            :key="`click-script-${i}`"
          >
            <div
              class="row q-col-gutter-sm items-center"
            >
              <div
                class="text-subtitle1"
              >
                {{ i + 1 }}.
              </div>
              <app-manager-form-script
                v-model="clickScriptList[i]"
                class="col-grow"
              />
              <q-btn
                class="col-shrink"
                flat
                rounded
                color="negative"
                icon="close"
                dense
                @click="onClickRemoveClickScriptBtn(i)"
              >
                <q-tooltip>
                  Remove
                </q-tooltip>
              </q-btn>
            </div>
          </div>
          <div>
            <q-btn
              color="primary"
              size="sm"
              @click="onClickAddClickScriptBtn"
            >
              Add new script
            </q-btn>
          </div>
        </div>
        <!-- schedule schedule list -->
        <div
          class="q-mt-sm q-col-gutter-sm"
        >
          <div
            class="text-subtitle1"
          >
            Schedule script list
            <app-manager-form-script-helper />
          </div>
          <div
            v-for="(script, i) in scheduleScriptList"
            :key="`schedule-script-${i}`"
          >
            <div
              class="row q-col-gutter-sm items-center"
            >
              <div
                class="text-subtitle1"
              >
                {{ i + 1 }}.
              </div>
              <app-manager-form-script
                v-model="scheduleScriptList[i]"
                class="col-grow"
              />
              <q-btn
                class="col-shrink"
                flat
                rounded
                color="negative"
                icon="close"
                dense
                @click="onClickRemoveScheduleScriptBtn(i)"
              >
                <q-tooltip>
                  Remove
                </q-tooltip>
              </q-btn>
            </div>
          </div>
          <div>
            <q-btn
              color="primary"
              size="sm"
              @click="onClickAddScheduleScriptBtn"
            >
              Add new script
            </q-btn>
          </div>
        </div>
        <!-- helloScriptList -->
        <div
          class="q-mt-sm q-col-gutter-sm"
        >
          <div
            class="text-subtitle1"
          >
            Birthday script
            <app-manager-form-script-helper />
          </div>
          <app-manager-form-script
            v-model="birthdayScript"
            class="col-grow"
          />
        </div>
        <div
          class="q-mt-md q-mt-auto"
        >
          <q-separator
            class="q-mb-sm"
          />
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
import CColorPicker from '@/components/commons/forms/ColorPicker/index.vue'
import AppManagerFormScriptHelper from '@/views/apps/managers/Form/components/ScriptHelper.vue'
import { useManagerStore } from '@/stores/manager'

const route = useRoute()
const managerStore = useManagerStore()

const isSaveBtnLoading = ref(false)
const name = ref('')
const color = ref<string>(undefined)
const age = ref(0)
const birthdayScript = ref<ManagerScriptForm>({
  message: '',
  status: 'CREATE'
})
const helloScriptList = ref<ManagerScriptForm[]>([{
  message: '',
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
    message: '',
    status: 'CREATE'
  })
}

const onClickRemoveHelloScriptBtn = (index: number) => {
  helloScriptList.value.splice(index, 1)
}

const onClickAddClickScriptBtn = () => {
  clickScriptList.value.push({
    message: '',
    status: 'CREATE'
  })
}

const onClickRemoveClickScriptBtn = (index: number) => {
  clickScriptList.value.splice(index, 1)
}

const onClickAddScheduleScriptBtn = () => {
  scheduleScriptList.value.push({
    message: '',
    status: 'CREATE'
  })
}

const onClickRemoveScheduleScriptBtn = (index: number) => {
  scheduleScriptList.value.splice(index, 1)
}

const onClickSaveBtn = () => {
  try {
    isSaveBtnLoading.value = true
    // update mode
    if (isUpdateForm.value) {
      managerStore.updateManager({})
    } else {
      managerStore.createManager({})
    }
  } catch (e) {
    console.error(e)
  } finally {
    isSaveBtnLoading.value = false
  }
}
</script>
