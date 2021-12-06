export enum ReservedWordEnum {
  'USER_NAME'= '{{ name }}',
  'MANAGER_NAME' = '{{ manager_name }}',
  'SCHEDULE_TITLE' = '{{ schedule_title }}'
}

// export const

export interface ReplaceAllReservedWordPayload {
  message: string
  userName?: string
  managerName: string
  scheduleTitle?: string
}
