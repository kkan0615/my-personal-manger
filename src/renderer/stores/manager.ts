import { defineStore } from 'pinia'
import { IpcRendererEvent } from 'electron'
import { ipcRenderer } from '@/utils/electron'
import { DEFAULT_MANAGER_MESSAGE_TIMEOUT } from '@/types/managers'
import { getRandElInArr } from '@/utils/commons'
import { useSettingStore } from '@/stores/setting'
import { ManagerConfig } from '@/types/managers/config'
import { SelectListResult } from '@/types/commons/server'
import { Manager } from '@main/types/managers'

export interface ManagerState {
  currentManager: any
  currentManagerConfig: ManagerConfig
  isShowMessageBox: boolean
  message: string
  messageTimer: any
  messageAudio: HTMLAudioElement | null
  managerListFilter: any
  managerList: any[]
  managerListCount: number
  manager: any
}

export const useManagerStore = defineStore('manager', {
  state: (): ManagerState => {
    return {
      currentManager: {},
      currentManagerConfig: {
        isPossibleMove: false,
        isOnlyDisplayEvent: false,
        volume: 30
      },
      isShowMessageBox: false,
      message: '',
      messageTimer: null,
      messageAudio: null,
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
    CurrentMangerConfig (state) {
      return state.currentManagerConfig
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
     * subscribe events relative with manager
     */
    subscribeManageEvents () {
      ipcRenderer.on('listen-schedule', this.listenSchedule)
    },
    /**
     * unsubscribe events relative with manager
     */
    unsubscribeManageEvents () {
      ipcRenderer.off('listen-schedule', this.listenSchedule)
    },
    /**
     * Set message
     */
    setMessageStr (payload: string) {
      this.isShowMessageBox = true
      this.message = payload
      this.setTimer()
    },
    /**
     *
     * @param payload
     */
    setMessage (payload: any) {
      /*  Display message box */
      this.isShowMessageBox = true
      /* Set the time for timer */
      let timerMs = DEFAULT_MANAGER_MESSAGE_TIMEOUT
      /* If there is sound */
      if (payload.sound) {
        /* Set audio */
        this.messageAudio = new Audio(window.URL.createObjectURL(new Blob([payload.soundFile])))
        this.messageAudio.volume = this.currentManagerConfig.volume * 0.01
        this.messageAudio.addEventListener('canplaythrough', async () => {
          if (this.messageAudio) {
            this.messageAudio.play()
            timerMs = (this.messageAudio.duration * 1000) + 500
            this.setTimer(timerMs)
          }
        })
      } else {
        this.setTimer(DEFAULT_MANAGER_MESSAGE_TIMEOUT)
      }
      this.message = payload.message
    },
    setTimer (payload = DEFAULT_MANAGER_MESSAGE_TIMEOUT) {
      this.messageTimer = setTimeout(() => {
        this.resetTimer()
      }, payload)
    },
    resetTimer () {
      /* Hide message box */
      this.isShowMessageBox = false
      /* Remove timer */
      if (this.messageTimer) {
        clearTimeout(this.messageTimer)
        this.messageTimer = null
      }
      /* Remove audio */
      if (this.messageAudio) {
        this.messageAudio.pause()
      }
      this.messageAudio = null
    },
    /**
     * Open manger app window
     * @param payload - message
     */
    listenSchedule (event: IpcRendererEvent, payload: string) {
      if (this.messageTimer) {
        this.resetTimer()
      }
      const randScheduleScript = getRandElInArr(this.currentManager.scheduleScriptList)
      this.setMessage({
        //@schedule
        ...randScheduleScript,
        message: randScheduleScript.message.replaceAll('@schedule', payload),
      })
    },
    /**
     * When manger is opened
     */
    helloManager () {
      if (this.messageTimer) {
        this.resetTimer()
      }
      // @TODO: Add logic for birthday
      const randHelloScript = getRandElInArr(this.currentManager.helloScriptList)
      this.setMessage(randHelloScript)
    },
    /**
     * When touch or click the manager
     */
    clickManager () {
      if (this.messageTimer) {
        this.resetTimer()
      }
      const randClickMsg = getRandElInArr(this.currentManager.clickScriptList)
      this.setMessage(randClickMsg)
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
     *
     * @param payload
     */
    async setCurrentManagerConfig (payload: any) {
      this.currentManagerConfig = payload
      await ipcRenderer.invoke('set-current-manager-config')
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
    async loadManagerList (payload: any) {
      const res = await ipcRenderer.invoke('find-manager-all') as SelectListResult<Manager>
      console.log('res', res)
      this.managerList = res.rows
      this.managerListCount = res.count
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
