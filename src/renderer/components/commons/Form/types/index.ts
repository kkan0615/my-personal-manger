import BBaseInput from '@/components/tailwind/input/Base/index.vue'
import { InjectionKey } from 'vue'

export interface BFormProvideData {
  register: (component: InstanceType<typeof BBaseInput>) => void
  unregister: (uid: number) => void
}

export const BFormProvideKey: InjectionKey<BFormProvideData> = Symbol('bootstrap-form-provide-key')
