import { Manager } from '@/types/models/Manager'
import { ReplaceAllReservedWordPayload, ReservedWordEnum } from '@/types/models/Manager/reservedWord'

const electron = window.require('electron')

export const getImageFile = async (manager: Manager) => {
  const imageBuffer: Buffer = await electron.ipcRenderer.invoke('get-manager-image', {
    id: manager.id,
    img: manager.img,
  })
  const imgData = new Blob([imageBuffer], { type: 'image/png' })
  return URL.createObjectURL(imgData)
}

export const getCircleImageFile = async (manager: Manager) => {
  const imageBuffer: Buffer = await electron.ipcRenderer.invoke('get-manager-circle-image', {
    id: manager.id,
    circleImg: manager.circleImg,
  })
  const imgData = new Blob([imageBuffer], { type: 'image/png' })
  return URL.createObjectURL(imgData)
}


export const getImageFileAsBlob = async (manager: Manager) => {
  const imageBuffer: Buffer = await electron.ipcRenderer.invoke('get-manager-image', {
    id: manager.id,
    img: manager.img,
  })
  return new Blob([imageBuffer], { type: 'image/png' })
}

export const getCircleImageFileAsBlob = async (manager: Manager) => {
  const imageBuffer: Buffer = await electron.ipcRenderer.invoke('get-manager-circle-image', {
    id: manager.id,
    circleImg: manager.circleImg,
  })
  return new Blob([imageBuffer], { type: 'image/png' })
}

export const replaceAllReservedWords = (payload: ReplaceAllReservedWordPayload) => {
  let result = payload.message
  result = result.replaceAll(ReservedWordEnum.USER_NAME, payload.userName)
  result = result.replaceAll(ReservedWordEnum.MANAGER_NAME, payload.managerName)
  result = result.replaceAll(ReservedWordEnum.SCHEDULE_TITLE, payload.scheduleTitle)

  return result
}
