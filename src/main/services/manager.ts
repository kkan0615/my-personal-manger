import fs from 'fs'
import path from 'path'
import isDev from 'electron-is-dev'
import { IpcMainInvokeEvent } from 'electron'
import { Manager, ManagerCreateForm, ManagerWithConfig } from '../types/models/Manager'
import { v4 } from 'uuid'

const dataFolder = isDev ? path.join(__dirname, '..', 'data') : path.join(process.resourcesPath, 'data')

export const createManager = async (payload: ManagerCreateForm) => {
  /* Data data folder is not exist */
  if (!fs.existsSync(dataFolder)) {
    fs.mkdirSync(dataFolder)
  }

  /* Set manager Id */
  const managerId = v4()
  payload.manager.id = managerId

  // if (payload.mainImg) {
  //   /* Blob to int8Array */
  //   const fileData = new Int8Array(await payload.mainImg.arrayBuffer())
  //   /* Create file */
  //   fs.writeFileSync(`${dataFolder}/${managerId}/manger.${payload.mainImg.name.split('.')[1]}`, fileData)
  // }
  //
  // if (payload.circleImg) {
  //   /* Blob to int8Array */
  //   const fileData = new Int8Array(await payload.circleImg.arrayBuffer())
  //   /* Create file */
  //   fs.writeFileSync(`${dataFolder}/${managerId}/manger_circle.${payload.circleImg.name.split('.')[1]}`, fileData)
  // }

  /* Create file */
  fs.mkdirSync(`${dataFolder}/${managerId}`)
  fs.writeFileSync(`${dataFolder}/${managerId}/manager.json`, JSON.stringify(payload.manager))
  fs.writeFileSync(`${dataFolder}/${managerId}/managerConfig.json`, JSON.stringify(payload.config))

  return managerId
}

export const createManagerMainImage = async (id: string, file: File) => {
  if (!fs.existsSync(`${dataFolder}/${id}`)) {
    throw new Error('no existed id')
  }
  try {
    /* Blob to int8Array */
    const fileData = new Int8Array(await file.arrayBuffer())
    /* Create file */
    fs.writeFileSync(`${dataFolder}/${id}/manger.${file.name.split('.')[1]}`, fileData)
  } catch (e) {
    console.error(e)
    throw new Error('error')
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
    throw { code: 400, message: e }
  }
}

export const getManagerById = async (event: IpcMainInvokeEvent, args: string) => {
  try {
    const folderNameList = fs.readdirSync(dataFolder)
    console.log(folderNameList)
    return {}
  } catch (e) {
    console.error(e)
    throw { code: 400, message: e }
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
