import { defineStore } from 'pinia'
import { ipcRenderer } from '@/utils/electron'
import { UpdateCountResult } from '@/types/commons/server'
import { MasterConfig, MasterConfigUpdateForm } from '@/types/masters'

export interface MasterState {
  masterConfig: MasterConfig
}

export const useMasterStore = defineStore('master', {
  state: (): MasterState => {
    return {
      masterConfig: {} as MasterConfig,
    }
  },
  getters: {
    MasterConfig (state) {
      return state.masterConfig
    },
  },
  actions: {
    async loadMaster () {
      try {
        this.masterConfig = (await ipcRenderer.invoke('load-master-config')) as MasterConfig
      } catch (e) {
        console.error(e)
        throw e
      }
    },
    /**
     * Reset master
     */
    resetMaster () {
      this.masterConfig = {} as MasterConfig
    },
    async updateMaster (payload: MasterConfigUpdateForm) {
      try {
        const res = (await ipcRenderer.invoke('update-master-config', payload)) as UpdateCountResult
        if (!res || !res.updatedCount) {
          throw new Error('no updated count')
        }

        return res.updatedCount
      } catch (e) {
        console.error(e)
        throw e
      }
    },
  }
})
