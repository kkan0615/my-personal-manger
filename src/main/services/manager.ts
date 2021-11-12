import fs from 'fs'
import path from 'path'
import isDev from 'electron-is-dev'
import { ManagerCreateForm, ManagerWithConfig } from '../types/models/Manager'
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
  const mangerData: ManagerWithConfig = {
    manager: payload.manager,
    config: payload.config,
  }
  fs.writeFileSync(`${dataFolder}/${managerId}/manager.json`, JSON.stringify(mangerData))

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
