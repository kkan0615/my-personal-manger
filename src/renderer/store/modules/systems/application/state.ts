import { Snackbar } from '@/types/applications/Snackbar'

export interface ApplicationState {
  isGeneralSidebarOpen: boolean
  snackbarList: Array<Snackbar>
}

export const applicationState: ApplicationState = {
  isGeneralSidebarOpen: true,
  snackbarList: []
}
