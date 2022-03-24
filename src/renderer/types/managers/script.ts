export interface ManagerScript {
  soundFile?: File | ArrayBuffer | any // Buffer | File | Blob
  sound?: string | null
  message: string
}

export enum ManagerScriptKeywordEnum {
  'SCHEDULE'= '@schedule',
  'NAME' = '@name',
}

export type ManagerScriptForm = ManagerScript & {
  status: 'CREATE' | 'UPDATE'
  soundFileName?: string
}
