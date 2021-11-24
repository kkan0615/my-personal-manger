export type SnackbarType = 'info' | 'success' | 'danger' | 'warning'

export interface Snackbar {
  id: string
  title: string
  content: string
  type?: SnackbarType // if undefined, use primary color
}
