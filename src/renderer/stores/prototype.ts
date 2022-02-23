import { defineStore } from 'pinia'

export interface PrototypeState {
  prototypeListFilter: any
  prototypeList: any[]
  prototypeListCount: number
  prototype: any
}

export const usePrototypeStore = defineStore('prototype', {
  state: (): PrototypeState => {
    return {
      prototypeListFilter: {},
      prototypeList: [],
      prototypeListCount: 0,
      prototype: {},
    }
  },
  getters: {
    /**
     * Prototype List filter
     * @param state
     */
    PrototypeListFilter (state) {
      return state.prototypeListFilter
    },
    /**
     * List of Prototype
     * @param state
     * @constructor
     */
    PrototypeList (state) {
      return state.prototypeList
    },
    /**
     * Count of Prototype list
     * @param state
     * @constructor
     */
    PrototypeListCount (state) {
      return state.prototypeListCount
    },
    /**
     * Prototype
     * @param state
     */
    Prototype (state) {
      return state.prototype
    },
  },
  actions: {
    /**
     * set Prototype list filter
     * @param payload - List Filter to set
     */
    setPrototypeListFilter (payload: any) {
      this.prototypeListFilter = payload
    },
    /**
     * Reset Prototype list filter
     */
    resetPrototypeListFilter () {
      this.prototypeListFilter = {}
    },
    /**
     * Load list of PrototypeList
     * @param payload - List Filter
     */
    loadPrototypeList (payload: any) {
      this.prototypeList = []
      this.prototypeListCount = 0
    },
    /**
     * Reset Prototype list
     */
    resetPrototypeList () {
      this.prototypeList = []
      this.prototypeListCount = 0
    },
    /**
     * Load Prototype
     */
    loadPrototype () {
      this.prototype = {}
    },
    /**
     * Reset Prototype
     */
    resetPrototype () {
      this.prototype = {}
    },
    /**
     * Create Prototype
     * @param payload - create form
     */
    createPrototype (payload: any) {
      return 0
    },
    /**
     * Update Prototype by id
     * @param payload - update form
     */
    updatePrototype (payload: any) {
      return 0
    },
    /**
     * Delete Prototype by id
     * @param payload - target id
     */
    deletePrototype (payload: number) {
      return 0
    }
  }
})
