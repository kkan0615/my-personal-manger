export type ManagerConfigDisplayType = 'ALWAYS' | 'ONLY_EVENT'

export type ManagerConfigDisplayStyleType = 'FULL' | 'CIRCLE'

export interface ManagerConfig {
  display: ManagerConfigDisplayType
  isAlwaysTop: boolean
  displayStyle: ManagerConfigDisplayStyleType
  isOnSound: boolean
}

export const defaultManagerConfig: ManagerConfig = {
  display: 'ALWAYS',
  isAlwaysTop: true,
  displayStyle: 'FULL',
  isOnSound: false,
}
