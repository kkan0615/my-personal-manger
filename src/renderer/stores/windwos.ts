import { defineStore } from 'pinia'

export interface WindowState {
  isOpenAppWindowDrawer: boolean
}

export const useWindowStore = defineStore('window', {
  state: (): WindowState => {
    return {
      isOpenAppWindowDrawer: false
    }
  },
  getters: {
    /**
     * Window List filter
     * @param state
     */
    IsOpenAppWindowDrawer (state) {
      return state.isOpenAppWindowDrawer
    },
  },
  actions: {
    /**
     * set drawer for app window
     */
    async setIsOpenAppWindowDrawer (payalod: boolean) {
      this.isOpenAppWindowDrawer = payalod
    },
  }
})
