import fs from 'fs'
import path from 'path'
import isDev from 'electron-is-dev'
import { IpcMainInvokeEvent, IpcMainEvent } from 'electron'
import { Manager, ManagerCreateForm } from '../types/models/Manager'
import { v4 } from 'uuid'
import { electronStore } from '../store'
import { StoreKeyEnum } from '../types/store'

/* Path to data directory */
const dataFolder = isDev ? path.join(__dirname, '..', 'data') : path.join(process.resourcesPath, 'data')

/**
 * Get current manager stored in electron-store
 */
export const getCurrentManager = () => {
  const managerId = electronStore.get(StoreKeyEnum.MANAGER_ID)
  if (managerId) {
    const managerPath = isDev ? path.join(__dirname, `data/${managerId}/manager.json`) : path.join(process.resourcesPath, `data/${managerId}/manager.json`)
    const fileData = fs.readFileSync(managerPath, 'utf-8')

    return JSON.parse(fileData)
  } else {
    const defaultManagerPath = isDev ? path.join(__dirname, 'default', 'defaultManager.json') : path.join(process.resourcesPath, 'default', 'defaultManager.json')
    const fileData = fs.readFileSync(defaultManagerPath, 'utf-8')

    return JSON.parse(fileData)
  }
}

export const getManagerById = async (event: IpcMainInvokeEvent, args: string) => {
  if (args) {
    const managerPath = isDev ? path.join(__dirname, `data/${args}/manager.json`) : path.join(process.resourcesPath, `data/${args}/manager.json`)
    const fileData = fs.readFileSync(managerPath, 'utf-8')

    return JSON.parse(fileData)
  } else {
    const defaultManagerPath = isDev ? path.join(__dirname, 'default', 'defaultManager.json') : path.join(process.resourcesPath, 'default', 'defaultManager.json')
    const fileData = fs.readFileSync(defaultManagerPath, 'utf-8')

    return JSON.parse(fileData)
  }
}

export const getManagerImage = (event: IpcMainInvokeEvent, args: Manager) => {
  let imgPath: string
  if (args && args.id) {
    imgPath = isDev ? path.join(__dirname, '../data', args.id, args.img) : path.join(process.resourcesPath, 'data', args.id, args.img)
  } else {
    imgPath = isDev ? path.join(__dirname, '../default', args.img) : path.join(process.resourcesPath, 'default', args.img)
  }
  return fs.readFileSync(imgPath)
}

export const getManagerCircleImage = (event: IpcMainInvokeEvent, args: Manager) => {
  let imgPath: string
  if (args && args.id) {
    imgPath = isDev ? path.join(__dirname, '../data', args.id, args.circleImg) : path.join(process.resourcesPath, 'data', args.id, args.circleImg)
  } else {
    imgPath = isDev ? path.join(__dirname, '../default', args.circleImg) : path.join(process.resourcesPath, 'default', args.circleImg)
  }

  return fs.readFileSync(imgPath)
}

export const setManagerId = (event: IpcMainEvent, args: string) => {
  electronStore.set(StoreKeyEnum.MANAGER_ID, args)
}

export const clearManagerId = () => {
  electronStore.delete(StoreKeyEnum.MANAGER_ID)
}

export const createManager = async (event: IpcMainInvokeEvent, payload: ManagerCreateForm) => {
  /* Data data folder is not exist */
  if (!fs.existsSync(dataFolder)) {
    fs.mkdirSync(dataFolder)
  }

  /* Set manager Id */
  const managerId = v4()

  if (payload.mainImgFile) {
    /* Blob to int8Array */
    const fileData = new Int8Array(await payload.mainImgFile.arrayBuffer())
    /* Create file */
    fs.writeFileSync(`${dataFolder}/${managerId}/manger.${payload.mainImgFile.name.split('.')[1]}`, fileData)
  }

  if (payload.circleImgFile) {
    /* Blob to int8Array */
    const fileData = new Int8Array(await payload.circleImgFile.arrayBuffer())
    /* Create file */
    fs.writeFileSync(`${dataFolder}/${managerId}/manger_circle.${payload.circleImgFile.name.split('.')[1]}`, fileData)
  }

  /* Create file */
  /* Make directory with id */
  fs.mkdirSync(`${dataFolder}/${managerId}`)
  /* Create manager.json file */
  fs.writeFileSync(`${dataFolder}/${managerId}/manager.json`, JSON.stringify({
    id: managerId,
    img: payload.mainImgFile.name,
    circleImg: payload.circleImgFile.name,
    name: payload.name,
    displayStyle: payload.displayStyle || 'FULL',
    randClickMessages: payload.randClickMessages,
    morningMessages: payload.morningMessages,
    lunchMessages: payload.lunchMessages,
    nightMessages: payload.nightMessages,
    eveningsMessages: payload.eveningsMessages,
  } as Manager))

  return managerId
}

export const createManagerMainImage = async (id: string, file: File) => {
  if (!fs.existsSync(`${dataFolder}/${id}`)) {
    throw { code: 400, message: 'no existed id' }
  }
  try {
    /* Blob to int8Array */
    const fileData = new Int8Array(await file.arrayBuffer())
    /* Create file */
    fs.writeFileSync(`${dataFolder}/${id}/manger.${file.name.split('.')[1]}`, fileData)
  } catch (e) {
    console.error(e)
    throw { code: 500, message: e }
  }
}

export const updateManger = () => {
  console.log('updateManger')
}

/**
 * Delete manager
 * @param event
 * @param id - id of manager
 */
export const deleteManager = (event: IpcMainInvokeEvent, id: string) => {
  const dirNameList = fs.readdirSync(dataFolder)
  // 1. if existed, remove directory including all data
  if (dirNameList.includes(id)) {
    fs.rmdirSync(`${dataFolder}/${id}}`)
  } else {
    throw { code: 'no data', message: 'Fail to find dir by id' }
  }
}

export const getManagerList = async () => {
  try {
    const result: Array<Manager> = []
    const folderNameList = fs.readdirSync(dataFolder)
    for (let i = 0; i < folderNameList.length; i++) {
      const folderName = folderNameList[i]
      const manager = fs.readFileSync(`${dataFolder}/${folderName}/manager.json`)
      result.push(JSON.parse(manager as any))
    }
    return result
  } catch (e) {
    console.error(e)
    throw { code: 500, message: e }
  }
}
