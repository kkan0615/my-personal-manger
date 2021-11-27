/* Tray */
import { Menu, Tray } from 'electron'
import isDev from 'electron-is-dev'
import path from 'path'
import { createMainWindow, mainWindow } from './mainWindow'
import { createManagerWindow, managerWindow } from './manager'

export let tray: Tray

export const createTray = () => {
  const trayImgPath = isDev ? path.join(__dirname, '../default/tray.jpg') : path.join(process.resourcesPath, 'default', 'tray.jpg')
  tray = new Tray(trayImgPath)
  tray.setToolTip('My Personal Manager')

  const contextMenuList = Menu.buildFromTemplate([{
    label: 'Open main',
    click: () => {
      if (mainWindow)
        mainWindow.show()
      else {
        createMainWindow()
      }
    },
  }, {
    label: 'Close main',
    click: () => {
      if (mainWindow && mainWindow.closable) {
        mainWindow.close()
      }
    },
  }, {
    label: 'Open Manager',
    click: () => {
      if (managerWindow)
        managerWindow.show()
      else {
        createManagerWindow()
      }
    },
  }, {
    label: 'Close Manager',
    click: () => {
      if (managerWindow && managerWindow.closable) {
        managerWindow.close()
      }
    },
  }, {
    label: 'Exit',
    click: () => {
      if (mainWindow && mainWindow.closable)
        mainWindow.close()
      if (managerWindow && managerWindow.closable)
        managerWindow.close()
    },
  }])
  tray.setContextMenu(contextMenuList)
}
