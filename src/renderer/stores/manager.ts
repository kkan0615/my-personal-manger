import { defineStore } from 'pinia'
import { IpcRendererEvent } from 'electron'
import { ipcRenderer } from '@/utils/electron'
import { DEFAULT_MANAGER_MESSAGE_TIMEOUT } from '@/types/managers'
import { getRandElInArr, getRandInt } from '@/utils/commons'

export interface ManagerState {
  currentManager: any
  currentManagerSetting: any
  isShowMessageBox: boolean
  message: string
  messageTimer: any
  managerListFilter: any
  managerList: any[]
  managerListCount: number
  manager: any
}

export const useManagerStore = defineStore('manager', {
  state: (): ManagerState => {
    return {
      currentManager: {},
      currentManagerSetting: {},
      isShowMessageBox: false,
      message: '',
      messageTimer: null,
      managerListFilter: {},
      managerList: [],
      managerListCount: 0,
      manager: {},
    }
  },
  getters: {
    /**
     * Current manager
     * @param state
     */
    CurrentManger (state) {
      return state.currentManager
    },
    /**
     * Current manager setting
     * @param state
     */
    CurrentMangerSetting (state) {
      return state.currentManagerSetting
    },
    /**
     * Is show message box
     * @param state
     */
    IsShowMessageBox (state) {
      return state.isShowMessageBox
    },
    /**
     * Message
     * @param state
     */
    Message (state) {
      return state.message
    },
    /**
     * message timer
     * @param state
     */
    MessageTimer (state) {
      return state.messageTimer
    },
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
    /**
     * Open manger app window
     */
    openManagerWindow () {
      ipcRenderer.send('open-manager-window')
    },
    /**
     * Open manger app window
     */
    closeManagerWindow () {
      ipcRenderer.send('open-manager-window')
    },
    /**
     * Open manger app window
     */
    subscribeManageEvents () {
      ipcRenderer.on('listen-schedule', this.listenSchedule)
    },
    /**
     * Open manger app window
     */
    unsubscribeManageEvents () {
      ipcRenderer.off('listen-schedule', this.listenSchedule)
    },
    /**
     * Set message
     */
    setMessage (payload: string) {
      this.isShowMessageBox = true
      this.message = payload
      this.messageTimer = setTimeout(() => {
        this.isShowMessageBox = false
        this.messageTimer = null
      }, DEFAULT_MANAGER_MESSAGE_TIMEOUT)
    },
    /**
     * Open manger app window
     */
    listenSchedule (event: IpcRendererEvent, payload: string) {
      this.isShowMessageBox = true
      this.message = payload
      this.messageTimer = setTimeout(() => {
        this.isShowMessageBox = false
        this.messageTimer = null
      }, DEFAULT_MANAGER_MESSAGE_TIMEOUT)
    },
    clickManager () {
      this.isShowMessageBox = true
      this.message = getRandElInArr(this.currentManager.randClickMessages).message
      this.messageTimer = setTimeout(() => {
        this.isShowMessageBox = false
        this.messageTimer = null
      }, DEFAULT_MANAGER_MESSAGE_TIMEOUT)
    },
    /**
     * Load current manager <br>
     * if yes, return current manager. else return default manager
     */
    async loadCurrentManager () {
      const res = await ipcRenderer.invoke('get-current-manager')
      console.log('res', res)
      this.currentManager = res.data
    },
    /**
     * Reset current manager
     */
    resetCurrentManager () {
      this.currentManager = {}
    },
    /**
     * Set message box status
     */
    setIsDisplayMessageBox (payload: boolean) {
      this.isShowMessageBox = payload
    },
    /**
     * set manager list filter
     * @param payload - List Filter to set
     */
    setManagerListFilter (payload: any) {
      this.managerListFilter = payload
    },
    /**
     * Reset manager list filter
     */
    resetManagerListFilter () {
      this.managerListFilter = {}
    },
    /**
     * Load list of manager
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
