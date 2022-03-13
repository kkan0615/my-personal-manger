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
  const filePath = `${app.getPath('documents')}/${app.getName()}/${currentManagerId}`
  const managerJson = JSON.parse((await fs.readFile(`${filePath}/manager.json`, 'utf-8'))) as Manager
  /* Set the sound file */
  managerJson.birthdayScript = await setMessageSound(currentManagerId, managerJson.birthdayScript)
  managerJson.helloScriptList = await Promise.all(managerJson.helloScriptList.map(async (script) => setMessageSound(currentManagerId, script)))
  managerJson.scheduleScriptList = await Promise.all(managerJson.scheduleScriptList.map(async (script) => setMessageSound(currentManagerId, script)))
  managerJson.clickScriptList = await Promise.all(managerJson.clickScriptList.map(async (script) => setMessageSound(currentManagerId, script)))

  return {
    data: {
      ...managerJson,
      id: currentManagerId,
      main: await fs.readFile(`${filePath}/${managerJson.mainImg}`),
    }
  }
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
