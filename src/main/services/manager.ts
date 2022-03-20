import { app, IpcMainInvokeEvent } from 'electron'
import fs from 'fs/promises'
import { electronStore } from '../store'
import { Manager } from '../types/managers'
import { ManagerScript } from '../types/managers/script'
import { DeleteCountResult, InsertOneResult, UpdateCountResult } from '../types/server'
import { v4 } from 'uuid'

const setMessageSound = async (managerId: string, script: ManagerScript) => {
  const filePath = `${app.getPath('documents')}/${app.getName()}/${managerId}`

  return {
    ...script,
    soundFile: script.sound ? (await fs.readFile(`${filePath}/audio/${script.sound}`)) : undefined,
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
  const filePath = `${app.getPath('documents')}/${app.getName()}/${payload}`
  const managerJson = JSON.parse((await fs.readFile(`${filePath}/manager.json`, 'utf-8'))) as Manager
  /* Set the sound file */
  managerJson.birthdayScript = await setMessageSound(payload, managerJson.birthdayScript)
  managerJson.helloScriptList = await Promise.all(managerJson.helloScriptList.map(async (script) => setMessageSound(payload, script)))
  managerJson.scheduleScriptList = await Promise.all(managerJson.scheduleScriptList.map(async (script) => setMessageSound(payload, script)))
  managerJson.clickScriptList = await Promise.all(managerJson.clickScriptList.map(async (script) => setMessageSound(payload, script)))
  console.log(await fs.readFile(`${filePath}/${managerJson.mainImg}`),)
  /* Return */
  return {
    data: {
      ...managerJson,
      main: (await fs.readFile(`${filePath}/${managerJson.mainImg}`)),
    }
  }
}

const _createManagerScript = async (id: string, payload: any) => {
  try {
    console.log('payload', payload)
    const path = `${app.getPath('documents')}/${app.getName()}/${id}/audio`
    if (payload.soundFile) {
      const soundName = `${v4()}.${payload.sound.split('.')[1]}`
      await fs.writeFile(`${path}/${soundName}`, payload.soundFile)
      payload.sound = soundName
    }

    return {
      message: payload.message,
      sound: payload.sound ? payload.sound : '',
    } as ManagerScript
  } catch (e) {
    console.error(e)
    throw e
  }
}

export const createManager = async (event: IpcMainInvokeEvent | null, payload: any) => {
  try {
    const newId = v4()
    const path = `${app.getPath('documents')}/${app.getName()}/${newId}`
    /* Create directory */
    await fs.mkdir(path)
    /* Create audio files directory */
    await fs.mkdir(`${path}/audio`)

    const helloScriptList: ManagerScript[] = await Promise.all(payload.helloScriptList.map(async (script: any) => await _createManagerScript(newId, script)))
    const clickScriptList: ManagerScript[] = await Promise.all(payload.clickScriptList.map(async (script: any) => await _createManagerScript(newId, script)))
    const scheduleScriptList: ManagerScript[] = await Promise.all(payload.scheduleScriptList.map(async (script: any) => await _createManagerScript(newId, script)))
    const birthdayScript: ManagerScript = await _createManagerScript(newId, payload.birthdayScript)
    /* Create main img */
    await fs.writeFile(`${path}/main.${payload.mainImgName.split('.')[1]}`, payload.mainImg)
    /* Create manager.json */
    await fs.writeFile(`${path}/manager.json`, JSON.stringify({
      id: newId,
      name: payload.name,
      age: payload.age,
      color: payload.color,
      gender: payload.gender,
      mainImg: payload.mainImgName,
      helloScriptList,
      clickScriptList,
      scheduleScriptList,
      birthdayScript,
    } as Manager))

    /* Return */
    return {
      insertedId: newId,
    } as InsertOneResult
  } catch (e) {
    console.error(e)
    throw e
  }
}

export const updateManager = async (event: IpcMainInvokeEvent | null, payload: any) => {
  try {
    /* Delete Manager data */
    await deleteManager(event, payload.id)
    /* Create new manager */
    delete payload.id
    await createManager(event, payload)

    return {
      updatedCount: 1,
    } as UpdateCountResult
  } catch (e) {
    console.error(e)
    throw e
  }
}

export const deleteManager = async (event: IpcMainInvokeEvent | null, payload: string) => {
  try {
    const filePath = `${app.getPath('documents')}/${app.getName()}/${payload}`
    await fs.rmdir(filePath, {
      recursive: true,
    })

    return {
      deletedCount: 1,
    } as DeleteCountResult
  } catch (e) {
    console.error(e)
    throw e
  }
}
