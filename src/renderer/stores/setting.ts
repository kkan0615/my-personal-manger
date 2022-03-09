import { defineStore } from 'pinia'
import { ipcRenderer } from '@/utils/electron'

export interface SettingState {
  volume: number
  savedManagerPath: string
}

export const useSettingStore = defineStore('setting', {
  state: (): SettingState => {
    return {
      volume: 50,
      savedManagerPath: ''
    }
  },
  getters: {
    /**
     * Volume
     * @param state
     */
    Volume (state) {
      return state.volume
    },
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
     */
    async loadAppSetting () {
      const res = await ipcRenderer.invoke('get-app-setting') as any
      this.savedManagerPath = res.savedManagerPath
    },
  }
})
