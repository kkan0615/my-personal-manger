import { defineStore } from 'pinia'
import { Schedule, ScheduleCreateForm } from '@/types/schedules'
import { ipcRenderer } from '@/utils/electron'

export interface ScheduleState {
  scheduleListFilter: any
  scheduleList: Schedule[]
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
     // * @param payload - List Filter
     */
    async loadScheduleList () {
      try {
        const res = (await ipcRenderer.invoke('load-schedule-list')) as Schedule[]
        console.log(res)
        this.scheduleList = res
        this.scheduleListCount = res.length
      } catch (e) {
        console.error(e)
        throw e
      }
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
    async deleteSchedule (payload: string) {
      try {
        const res = await ipcRenderer.invoke('delete-schedule', payload)
        return res
      } catch (e) {
        console.error(e)
        throw e
      }
    },
    async deleteSchedulePermanently (payload: string) {
      try {
        const res = await ipcRenderer.invoke('delete-schedule-permanently', payload)
        return res
      } catch (e) {
        console.error(e)
        throw e
      }
    }
  }
})
