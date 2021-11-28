export interface ManagerMessage {
  sound?: string
  message: string
}

export type ManagerDisplayStyle = 'FULL' | 'CIRCLE' | 'ALL'

export interface Manager {
  id: string
  name: string
  img: string
  circleImg: string
  morningMessages: Array<ManagerMessage>
  lunchMessages: Array<ManagerMessage>
  eveningsMessages: Array<ManagerMessage>
  nightMessages: Array<ManagerMessage>
  randClickMessages: Array<ManagerMessage>
  displayStyle: ManagerDisplayStyle
}

export type ManagerCreateForm = Omit<Manager, 'id'> & {
  mainImgFile: File
  circleImgFile: File
}
export type ManagerUpdateForm = Manager
