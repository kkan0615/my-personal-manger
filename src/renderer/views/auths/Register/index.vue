<template>
  <div
    class="tw-h-screen tw-bg-blue-300"
  >
    <c-card
      class="p-4 tw-h-full text-center tw-flex tw-flex-col"
    >
      <div
        class="tw-font-bold tw-text-lg mb-2"
      >
        My Personal Manager
      </div>
      <c-form
        ref="formRef"
        class="tw-text-left tw-space-y-3 "
      >
        <div>
          <label
            class="form-label mb-0"
          >
            Your name
          </label>
          <c-base-input
            id="input-user-name"
            v-model="userName"
            placeholder="Enter user name"
          />
        </div>
        <div>
          <label
            class="form-label mb-0"
          >
            Birthday
          </label>
          <v-date-picker
            v-model="birthday"
            mode="date"
            is24hr
            trim-weeks
            :max-date="new Date()"
          >
            <template #default="{ inputValue, inputEvents }">
              <input
                id="input-user-birthday"
                class="form-control"
                :value="inputValue"
                placeholder="Enter Birthday"
                v-on="inputEvents"
              >
            </template>
          </v-date-picker>
        </div>
      </c-form>
      <div
        class="tw-mt-auto"
      >
        <c-button
          class="btn-primary mt-2 tw-w-full"
          @click="onClickLoginBtn"
        >
          Login
        </c-button>
      </div>
    </c-card>
  </div>
</template>
<script
    lang="ts"
>
export default {
  name: 'RegisterAuth',
}
</script>
<script setup lang="ts">
import CCard from '@/components/commons/Card/index.vue'
import CBaseInput from '@/components/commons/inputs/Base/index.vue'
import { ref } from 'vue'
import CForm from '@/components/commons/Form/index.vue'
import dayjs from 'dayjs'
import CButton from '@/components/commons/Button/index.vue'
import { CurrentActionTypes } from '@/store/modules/systems/current/actions'
import useStore from '@/store'
import { User } from '@/types/models/User'

const store = useStore()

const formRef = ref<HTMLFormElement>()

const userName = ref('')
const birthday = ref(dayjs().toDate())

const onClickLoginBtn = async () => {
  if (formRef.value) {
    formRef.value.checkValidation()
    try {
      await store.dispatch(CurrentActionTypes.REGISTER_USER, {
        name: userName.value,
        birthday: birthday.value
      } as User)
    } catch (e) {
      console.error(e)
    }
  }
}
</script>
