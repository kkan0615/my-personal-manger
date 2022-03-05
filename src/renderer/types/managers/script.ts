export interface ManagerScript {
  soundFile?: Buffer
  sound?: string | null
  message: string
}

export enum ManagerScriptKeywordEnum {
  'SCHEDULE'= '@schedule',
  'NAME' = '@name',
}
