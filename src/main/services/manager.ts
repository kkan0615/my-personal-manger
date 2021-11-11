import fs from 'fs'
import path from 'path'
import isDev from 'electron-is-dev'
import { MANAGER_FILE_PREFIX, ManagerWithConfig } from '../types/models/Manager'
import { v4 } from 'uuid'

export const createManager = (payload: ManagerWithConfig) => {
  const dataFolder = isDev ? path.join(__dirname, '..', 'data') : path.join(process.resourcesPath, 'data')
  /* Data data folder is not exist */
  if (!fs.existsSync(dataFolder)) {
    fs.mkdirSync(dataFolder)
  }

  // const fileList = fs.readdirSync(dataFolder).filter(file => file.includes(MANAGER_FILE_PREFIX))
  /* First slot */
  // if (!fileList.length) {
  const name = v4()
  fs.mkdirSync(`${dataFolder}/${name}`)
  fs.writeFileSync(`${dataFolder}/${name}/manager.json`, JSON.stringify(payload))
  // } else {
  //   const num = Number(fileList[fileList.length - 1].split(MANAGER_FILE_PREFIX)[1])
  //   fs.writeFileSync(`${dataFolder}/${MANAGER_FILE_PREFIX}${num + 1}`, JSON.stringify(payload))
  // }
}
