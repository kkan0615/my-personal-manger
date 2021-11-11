import fs from 'fs'
import path from 'path'
import { MANAGER_FILE_PREFIX, ManagerWithConfig } from '../types/models/Manager'

export const createManager = (payload: ManagerWithConfig) => {
  const dataFolder =  path.join(__dirname, '..', 'data')
  /* Data data folder is not exist */
  if (!fs.existsSync(dataFolder)) {
    fs.mkdirSync(dataFolder)
  }

  const fileList = fs.readdirSync(dataFolder).filter(file => file.includes(MANAGER_FILE_PREFIX))
  /* First slot */
  if (!fileList.length) {
    fs.writeFileSync(`${dataFolder}/${MANAGER_FILE_PREFIX}1`, JSON.stringify(payload))
  } else {
    const num = Number(fileList[fileList.length - 1].split(MANAGER_FILE_PREFIX)[1])
    fs.writeFileSync(`${dataFolder}/${MANAGER_FILE_PREFIX}${num + 1}`, JSON.stringify(payload))
  }
}
