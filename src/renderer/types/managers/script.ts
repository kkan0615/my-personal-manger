export interface ManagerScript {
  soundFile?: Buffer
  sound?: string | null
  message: string
}

export enum ManagerScriptKeywordEnum {
  'SCHEDULE'= '@schedule',
  'NAME' = '@name',
}

export type ManagerScriptForm = ManagerScript & {
  status: 'CREATE' | 'UPDATE'
}
