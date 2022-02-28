import { app, IpcMainInvokeEvent } from 'electron'
import fs from 'fs/promises'
import { electronStore } from '../store'
import { Manager } from '../types/managers'

export const getCurrentManager = async () => {
  const currentManagerId = electronStore.get('currentManagerId') || 'default'
  const filePath = `${app.getPath('documents')}/${app.getName()}/${currentManagerId}`
  const managerJson = JSON.parse((await fs.readFile(`${filePath}/manager.json`, 'utf-8'))) as Manager

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
