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
     * prototype List filter
     * @param state
     */
    PrototypeListFilter (state) {
      return state.prototypeListFilter
    },
    /**
     * List of prototype
     * @param state
     * @constructor
     */
    PrototypeList (state) {
      return state.prototypeList
    },
    /**
     * Count of prototype list
     * @param state
     * @constructor
     */
    PrototypeListCount (state) {
      return state.prototypeListCount
    },
    /**
     * prototype
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
     * Reset prototype list filter
     */
    resetPrototypeListFilter () {
      this.prototypeListFilter = {}
    },
    /**
     * Load list of prototype
     * @param payload - List Filter
     */
    loadPrototypeList (payload: any) {
      this.prototypeList = []
      this.prototypeListCount = 0
    },
    /**
     * Reset prototype list
     */
    resetPrototypeList () {
      this.prototypeList = []
      this.prototypeListCount = 0
    },
    /**
     * Load prototype
     * @param payload - id
     */
    loadPrototype (payload: any) {
      this.prototype = {}
    },
    /**
     * Reset prototype
     */
    resetPrototype () {
      this.prototype = {}
    },
    /**
     * Create prototype
     * @param payload - create form
     */
    createPrototype (payload: any) {
      return 0
    },
    /**
     * Update prototype by id
     * @param payload - update form
     */
    updatePrototype (payload: any) {
      return 0
    },
    /**
     * Delete prototype by id
     * @param payload - target id
     */
    deletePrototype (payload: number) {
      return 0
    }
  }
})
