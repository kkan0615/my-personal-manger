import fs from 'fs'
import path from 'path'
import isDev from 'electron-is-dev'
import { IpcMainInvokeEvent, IpcMainEvent } from 'electron'
import { Manager, ManagerCreateForm, ManagerUpdateForm } from '../types/models/Manager'
import { v4 } from 'uuid'
import { electronStore } from '../store'
import { StoreKeyEnum } from '../types/store'
import { toRef } from 'vue'

/* Path to data directory */
const dataFolder = isDev ? path.join(__dirname, '..', 'data') : path.join(process.resourcesPath, 'data')

/**
 * Get manager list
 */
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

/**
 * Get current manager stored in electron-store
 */
export const getCurrentManager = () => {
  const managerId = electronStore.get(StoreKeyEnum.MANAGER_ID)
  if (managerId) {
    const managerPath = isDev ? path.join(__dirname, `../data/${managerId}/manager.json`) : path.join(process.resourcesPath, `data/${managerId}/manager.json`)
    const fileData = fs.readFileSync(managerPath, 'utf-8')

    return JSON.parse(fileData)
  } else {
    const defaultManagerPath = isDev ? path.join(__dirname, '../default', 'defaultManager.json') : path.join(process.resourcesPath, 'default', 'defaultManager.json')
    const fileData = fs.readFileSync(defaultManagerPath, 'utf-8')

    return JSON.parse(fileData)
  }
}

/**
 * Get manager detail by id
 * @param event
 * @param args - id of manager
 */
export const getManager = async (event: IpcMainInvokeEvent, args: string) => {
  if (args) {
    const managerPath = isDev ? path.join(__dirname, `../data/${args}/manager.json`) : path.join(process.resourcesPath, `data/${args}/manager.json`)
    const fileData = fs.readFileSync(managerPath, 'utf-8')

    return JSON.parse(fileData)
  } else {
    const defaultManagerPath = isDev ? path.join(__dirname, '../default', 'defaultManager.json') : path.join(process.resourcesPath, 'default', 'defaultManager.json')
    const fileData = fs.readFileSync(defaultManagerPath, 'utf-8')

    return JSON.parse(fileData)
  }
}

export const getManagerImage = (event: IpcMainInvokeEvent, args: Manager) => {
  console.log(args)
  let imgPath: string
  if (args && args.id) {
    imgPath = isDev ? path.join(__dirname, '../data', args.id, `manager.${args.img.split('.')[1]}`) : path.join(process.resourcesPath, 'data', args.id, `manager.${args.img.split('.')[1]}`)
  } else {
    imgPath = isDev ? path.join(__dirname, '../default', 'manager.png') : path.join(process.resourcesPath, 'default', 'manager.png')
  }
  console.log(imgPath)
  return fs.readFileSync(imgPath)
}

export const getManagerCircleImage = (event: IpcMainInvokeEvent, args: Manager) => {
  let imgPath: string
  if (args && args.id) {
    imgPath = isDev ? path.join(__dirname, '../data', args.id, `manager-circle.${args.circleImg.split('.')[1]}`) : path.join(process.resourcesPath, 'data', args.id, `manager-circle.${args.circleImg.split('.')[1]}`)
  } else {
    imgPath = isDev ? path.join(__dirname, '../default', 'manager-circle.jpg') : path.join(process.resourcesPath, 'default', 'manager-circle.jpg')
  }

  return fs.readFileSync(imgPath)
}

export const setManagerId = (event: IpcMainEvent, args: string) => {
  electronStore.set(StoreKeyEnum.MANAGER_ID, args)
}

export const clearManagerId = () => {
  electronStore.delete(StoreKeyEnum.MANAGER_ID)
}

/**
 * Create manager
 * @param event
 * @param payload - Manager create form
 */
export const createManager = async (event: IpcMainInvokeEvent, payload: ManagerCreateForm) => {
  console.log(payload)
  /* Data data folder is not exist */
  if (!fs.existsSync(dataFolder)) {
    fs.mkdirSync(dataFolder)
  }

  /* Set manager Id */
  const managerId = v4()

  /* Data data folder is not exist */
  fs.mkdirSync(`${dataFolder}/${managerId}`)

  if (payload.mainImgFile) {
    /* Create file */
    fs.writeFileSync(`${dataFolder}/${managerId}/manager.${payload.img.split('.')[1]}`, payload.mainImgFile)
  }

  if (payload.circleImgFile) {
    /* Create file */
    fs.writeFileSync(`${dataFolder}/${managerId}/manager-circle.${payload.circleImg.split('.')[1]}`, payload.circleImgFile)
  }

  /* Create manager.json file */
  fs.writeFileSync(`${dataFolder}/${managerId}/manager.json`, JSON.stringify({
    id: managerId,
    img: payload.img ? payload.img : '',
    circleImg: payload.circleImg ? payload.circleImg : '',
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
    fs.writeFileSync(`${dataFolder}/${id}/manager.${file.name.split('.')[1]}`, fileData)
  } catch (e) {
    console.error(e)
    throw { code: 500, message: e }
  }
}

/**
 * Update manager
 * @param event
 * @param payload - manager update form
 */
export const updateManager = async (event: IpcMainInvokeEvent, payload: ManagerUpdateForm) => {
  console.log(payload)
  /* Data data folder is not exist */
  if (!fs.existsSync(dataFolder) && !fs.existsSync(`${dataFolder}/${payload.id}`)) {
    throw { code: 500, message: 'Directory is not exist' }
  }

  const exManagerJson: Manager = JSON.parse(fs.readFileSync(`${dataFolder}/${payload.id}/manager.json`) as any)

  if (payload.mainImgFile) {
    /* Find main ex image file */
    const mainImgFilePath = path.join(dataFolder, payload.id, `manager.${exManagerJson.img.split('.')[1]}`)
    const mainImgFileData = fs.readFileSync(mainImgFilePath, 'utf-8')
    if (mainImgFileData) {
      /* Remove old file */
      fs.rmSync(mainImgFilePath)
      /* Create file */
      fs.writeFileSync(`${dataFolder}/${payload.id}/manager.${payload.img.split('.')[1]}`, payload.mainImgFile)
    }
  }

  if (payload.circleImgFile) {
    /* Find main ex circle image file */
    const circleImgFilePath = path.join(dataFolder, payload.id, `manager-circle.${exManagerJson.circleImg.split('.')[1]}`)
    const circleImgFileData = fs.readFileSync(circleImgFilePath, 'utf-8')
    if (circleImgFileData) {
      /* Remove old file */
      fs.rmSync(circleImgFileData)
      /* Create file */
      fs.writeFileSync(`${dataFolder}/${payload.id}/manager-circle.${exManagerJson.circleImg.split('.')[1]}`, payload.circleImgFile)
    }
  }

  /* Remove ex manager.json file */
  fs.rmSync(`${dataFolder}/${payload.id}/manager.json`)
  /* Create manager.json file */
  fs.writeFileSync(`${dataFolder}/${payload.id}/manager.json`, JSON.stringify({
    id: payload.id,
    img: payload.img ? payload.img : exManagerJson.img,
    circleImg: payload.circleImg ? payload.circleImg : exManagerJson.circleImg,
    name: payload.name || exManagerJson.name,
    displayStyle: payload.displayStyle || exManagerJson.displayStyle || 'FULL',
    randClickMessages: payload.randClickMessages || exManagerJson.randClickMessages,
    morningMessages: payload.morningMessages || exManagerJson.morningMessages,
    lunchMessages: payload.lunchMessages || exManagerJson.lunchMessages,
    nightMessages: payload.nightMessages || exManagerJson.nightMessages,
    eveningsMessages: payload.eveningsMessages || exManagerJson.eveningsMessages,
  } as Manager))
}

/**
 * Delete manager
 * @param event
 * @param arg - id of manager
 */
export const deleteManager = (event: IpcMainInvokeEvent, arg: string) => {
  const dirNameList = fs.readdirSync(dataFolder)
  // 1. if existed, remove directory including all data
  if (dirNameList.includes(arg)) {
    console.log('pass?', arg)
    // 2. Remove all with directory
    fs.rmdirSync(`${dataFolder}/${arg}`, { recursive: true, force: true } as any)
    if (electronStore.get(StoreKeyEnum.MANAGER_ID) === arg) {
      electronStore.delete(StoreKeyEnum.MANAGER_ID)
    }
  } else {
    throw { code: 500, message: 'Fail to find dir by id' }
  }
}
