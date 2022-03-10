import { app, IpcMainInvokeEvent } from 'electron'
import fs from 'fs/promises'
import { electronStore } from '../store'
import { Manager } from '../types/managers'

export const getCurrentManager = async () => {
  const currentManagerId = electronStore.get('currentManagerId') || 'default'
  const filePath = `${app.getPath('documents')}/${app.getName()}/${currentManagerId}`
  const managerJson = JSON.parse((await fs.readFile(`${filePath}/manager.json`, 'utf-8'))) as Manager
  // Set the sound
  managerJson.randScheduleScriptList = await Promise.all(managerJson.randScheduleScriptList.map(async (message) => {
    return {
      ...message,
      soundFile: message.sound ? await fs.readFile(`${filePath}/audio/${message.sound}`) : undefined,
    }
  }))
  managerJson.randClickScriptList = await Promise.all(managerJson.randClickScriptList.map(async (message) => {
    return {
      ...message,
      soundFile: message.sound ? await fs.readFile(`${filePath}/audio/${message.sound}`) : undefined,
    }
  }))

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
