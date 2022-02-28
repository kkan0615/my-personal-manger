import { defineStore } from 'pinia'
import { ipcRenderer } from '@/utils/electron'

export interface SettingState {
  savedManagerPath: string
}

export const useSettingStore = defineStore('setting', {
  state: (): SettingState => {
    return {
      savedManagerPath: ''
    }
  },
  getters: {
    /**
     * Setting List filter
     * @param state
     */
    SavedManagerPath (state) {
      return state.savedManagerPath
    },
  },
  actions: {
    /**
     * set Setting list filter
     * @param payload - List Filter to set
     */
    async loadAppSetting () {
      const res = await ipcRenderer.invoke('get-app-setting') as any
      this.savedManagerPath = res.savedManagerPath
    },
  }
})
