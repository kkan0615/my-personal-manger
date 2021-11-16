import { InjectionKey } from 'vue'

export interface CSidebarProvideData {
  register: (component: any) => void
  unregister: (uid: number) => void
}

export const CSidebarProvideKey: InjectionKey<CSidebarProvideData> = Symbol('c-sidebar-provide-key')
