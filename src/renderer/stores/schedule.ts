import { defineStore } from 'pinia'
import { ScheduleCreateForm } from '@/types/schedules'
import { ipcRenderer } from '@/utils/electron'

export interface ScheduleState {
  scheduleListFilter: any
  scheduleList: any[]
  scheduleListCount: number
  schedule: any
}

export const useScheduleStore = defineStore('schedule', {
  state: (): ScheduleState => {
    return {
      scheduleListFilter: {},
      scheduleList: [],
      scheduleListCount: 0,
      schedule: {},
    }
  },
  getters: {
    /**
     * schedule List filter
     * @param state
     */
    ScheduleListFilter (state) {
      return state.scheduleListFilter
    },
    /**
     * List of schedule
     * @param state
     * @constructor
     */
    ScheduleList (state) {
      return state.scheduleList
    },
    /**
     * Count of schedule list
     * @param state
     * @constructor
     */
    ScheduleListCount (state) {
      return state.scheduleListCount
    },
    /**
     * schedule
     * @param state
     */
    Schedule (state) {
      return state.schedule
    },
  },
  actions: {
    /**
     * set Schedule list filter
     * @param payload - List Filter to set
     */
    setScheduleListFilter (payload: any) {
      this.scheduleListFilter = payload
    },
    /**
     * Reset schedule list filter
     */
    resetScheduleListFilter () {
      this.scheduleListFilter = {}
    },
    /**
     * Load list of schedule
     * @param payload - List Filter
     */
    loadScheduleList (payload: any) {
      this.scheduleList = []
      this.scheduleListCount = 0
    },
    /**
     * Reset schedule list
     */
    resetScheduleList () {
      this.scheduleList = []
      this.scheduleListCount = 0
    },
    /**
     * Load schedule
     * @param payload - id
     */
    loadSchedule (payload: any) {
      this.schedule = {}
    },
    /**
     * Reset schedule
     */
    resetSchedule () {
      this.schedule = {}
    },
    /**
     * Create schedule
     * @param payload - create form
     */
    async createSchedule (payload: ScheduleCreateForm) {
      try {
        const res = await ipcRenderer.invoke('create-schedule', payload)
        return res
      } catch (e) {
        console.error(e)
        throw e
      }
    },
    /**
     * Update schedule by id
     * @param payload - update form
     */
    updateSchedule (payload: any) {
      return 0
    },
    /**
     * Delete schedule by id
     * @param payload - target id
     */
    deleteSchedule (payload: number) {
      return 0
    }
  }
})
