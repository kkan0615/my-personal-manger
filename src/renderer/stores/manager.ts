import { defineStore } from 'pinia'
import { ipcRenderer } from '@/utils/electron'

export interface ManagerState {
  managerListFilter: any
  managerList: any[]
  managerListCount: number
  manager: any
}

export const useManagerStore = defineStore('manager', {
  state: (): ManagerState => {
    return {
      managerListFilter: {},
      managerList: [],
      managerListCount: 0,
      manager: {},
    }
  },
  getters: {
    /**
     * Manager List filter
     * @param state
     */
    ManagerListFilter (state) {
      return state.managerListFilter
    },
    /**
     * List of Manager
     * @param state
     * @constructor
     */
    ManagerList (state) {
      return state.managerList
    },
    /**
     * Count of Manager list
     * @param state
     * @constructor
     */
    ManagerListCount (state) {
      return state.managerListCount
    },
    /**
     * Manager
     * @param state
     */
    Manager (state) {
      return state.manager
    },
  },
  actions: {
    openManagerApp () {
      ipcRenderer.send('open-manager-window')
    },
    /**
     * set Manager list filter
     * @param payload - List Filter to set
     */
    setManagerListFilter (payload: any) {
      this.managerListFilter = payload
    },
    /**
     * Reset Manager list filter
     */
    resetManagerListFilter () {
      this.managerListFilter = {}
    },
    /**
     * Load list of ManagerList
     * @param payload - List Filter
     */
    loadManagerList (payload: any) {
      this.managerList = []
      this.managerListCount = 0
    },
    /**
     * Reset Manager list
     */
    resetManagerList () {
      this.managerList = []
      this.managerListCount = 0
    },
    /**
     * Load Manager
     */
    loadManager () {
      this.manager = {}
    },
    /**
     * Reset Manager
     */
    resetManager () {
      this.manager = {}
    },
    /**
     * Create Manager
     * @param payload - create form
     */
    createManager (payload: any) {
      return 0
    },
    /**
     * Update Manager by id
     * @param payload - update form
     */
    updateManager (payload: any) {
      return 0
    },
    /**
     * Delete Manager by id
     * @param payload - target id
     */
    deleteManager (payload: number) {
      return 0
    }
  }
})
