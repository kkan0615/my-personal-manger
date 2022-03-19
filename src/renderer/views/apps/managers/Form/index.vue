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
        @submit="onSubmit"
      >
        <div
          class="text-h6"
        >
          Manager Information
        </div>
        <!-- picture -->
        <c-row-input>
          <c-row-input-label>
            Picture
          </c-row-input-label>
          <c-row-input-content>
            <q-file
              v-model="picture"
              class="col-2"
              outlined
              dense
              accept="image/*"
            >
              <template #prepend>
                <q-icon name="attach_file" />
              </template>
            </q-file>
            <div
              style="height: 300px; width: 300px;"
            >
              <q-img
                class="full-height"
                fit="contain"
                :src="pictureSrc"
              />
            </div>
          </c-row-input-content>
        </c-row-input>
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
import { useQuasar } from 'quasar'
import { ManagerCreateForm, ManagerUpdateForm } from '@/types/managers'

const route = useRoute()
const $q = useQuasar()
const managerStore = useManagerStore()

const isSaveBtnLoading = ref(false)
const picture = ref<File | null>(null)
const name = ref('')
const color = ref<string | null>(null)
const age = ref(0)
const birthdayScript = ref<ManagerScriptForm>({
  message: '',
  status: 'CREATE'
})
const helloScriptList = ref<ManagerScriptForm[]>([]) // @TODO: Delete default value
const scheduleScriptList = ref<ManagerScriptForm[]>([])
const clickScriptList = ref<ManagerScriptForm[]>([])

const isUpdateForm = computed(() => route.name === 'AppManagerUpdateForm')
const pictureSrc = computed(() => picture.value ? window.URL.createObjectURL(new Blob([picture.value])) : '')

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

const onSubmit = () => {
  try {
    console.log('submit')
    isSaveBtnLoading.value = true
    // update mode
    if (isUpdateForm.value) {
      managerStore.updateManager({

      } as ManagerUpdateForm)
    } else {
      managerStore.createManager({
        mainImg: new Int8Array(picture.value.arrayBuffer()),
        mainImgName: picture.value.name,
        // mainImg: picture.value,
        name: name.value,
        age: age.value,
        color: color.value,
        gender: 'unknown',
        helloScriptList: helloScriptList.value.map(script => {
          return {
            message: script.message,
            sound:  script.sound,
            status:  script.status,
            soundFile: script.soundFile ? (script.soundFile as File).arrayBuffer() : undefined
            // soundFile: script.soundFile,
          }
        }),
        clickScriptList: clickScriptList.value.map(script => {
          return {
            message: script.message,
            sound:  script.sound,
            status:  script.status,
            soundFile: script.soundFile ? (script.soundFile as File).arrayBuffer() : undefined
            // soundFile: script.soundFile,
          }
        }),
        scheduleScriptList: scheduleScriptList.value.map(script => {
          return {
            message: script.message,
            sound:  script.sound,
            status:  script.status,
            soundFile: script.soundFile ? (script.soundFile as File).arrayBuffer() : undefined,
            // soundFile: script.soundFile,
          }
        }),
        birthdayScript: {
          message: birthdayScript.value.message,
          // soundFile:  birthdayScript.value.soundFile,
          soundFile: birthdayScript.value.soundFile ? (birthdayScript.value.soundFile as File).arrayBuffer() : undefined,
          status:  birthdayScript.value.status,
        },
      } as ManagerCreateForm)
    }
    $q.notify({
      message: 'success to save',
      position: 'bottom-right'
    })
  } catch (e) {
    console.error(e)
    $q.notify({
      icon: 'report_problem',
      color: 'negative',
      message: 'Fail to save',
      position: 'bottom-right'
    })
  } finally {
    isSaveBtnLoading.value = false
  }
}
</script>
