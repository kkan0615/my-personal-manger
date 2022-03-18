import { app, IpcMainInvokeEvent } from 'electron'
import fs from 'fs/promises'
import { electronStore } from '../store'
import { Manager } from '../types/managers'
import { ManagerScript } from '../types/managers/script'

const setMessageSound = async (managerId: string, script: ManagerScript) => {
  const filePath = `${app.getPath('documents')}/${app.getName()}/${managerId}`

  return {
    ...script,
    soundFile: script.sound ? await fs.readFile(`${filePath}/audio/${script.sound}`) : undefined,
  }
}

export const getCurrentManager = async () => {
  const currentManagerId = electronStore.get('currentManagerId') as string || 'default'
  return findManagerById(null, currentManagerId)
}

export const updateCurrentManager = async (event: IpcMainInvokeEvent, payload: string) => {
  electronStore.set('currentManagerId', payload)
}

export const getManagerImages = async (event: IpcMainInvokeEvent, args: { id: string }) => {
  const path = `${app.getPath('documents')}/${app.getName()}`
  return {
    main: await fs.readFile(`${path}/${args.id}/main.png`)
  }
}

export const getCurrentManagerConfig = async () => {
  return electronStore.get('managerWindow')
}

export const setCurrentManagerConfig = async (event: IpcMainInvokeEvent, args: any) => {
  electronStore.set('managerWindow', {
    volume: args.volume
  })
}

export const finaManagerAll =  async (event: IpcMainInvokeEvent | null) => {
  const directoryList = await fs.readdir(`${app.getPath('documents')}/${app.getName()}/`)
  return {
    rows: await Promise.all(directoryList.map(async dirName => {
      return (await findManagerById(event, dirName)).data
    })),
    count: directoryList.length
  }
}

export const findManagerById = async (event: IpcMainInvokeEvent | null, payload: string) => {
  console.log('id', payload)
  const filePath = `${app.getPath('documents')}/${app.getName()}/${payload}`
  const managerJson = JSON.parse((await fs.readFile(`${filePath}/manager.json`, 'utf-8'))) as Manager
  /* Set the sound file */
  managerJson.birthdayScript = await setMessageSound(payload, managerJson.birthdayScript)
  managerJson.helloScriptList = await Promise.all(managerJson.helloScriptList.map(async (script) => setMessageSound(payload, script)))
  managerJson.scheduleScriptList = await Promise.all(managerJson.scheduleScriptList.map(async (script) => setMessageSound(payload, script)))
  managerJson.clickScriptList = await Promise.all(managerJson.clickScriptList.map(async (script) => setMessageSound(payload, script)))

  return {
    data: {
      ...managerJson,
      main: await fs.readFile(`${filePath}/${managerJson.mainImg}`),
    }
  }
}
