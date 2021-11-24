import { Manager } from '@/types/models/Manager'

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
