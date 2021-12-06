/* Tray */
import { Menu, Tray, MenuItemConstructorOptions, MenuItem } from 'electron'
import isDev from 'electron-is-dev'
import path from 'path'
import { createMainWindow, mainWindow } from './mainWindow'
import { createManagerWindow, managerWindow } from './manager'

export let tray: Tray

export const createTray = () => {
  const trayImgPath = isDev ? path.join(__dirname, '../default/tray.jpg') : path.join(process.resourcesPath, 'default', 'tray.jpg')
  tray = new Tray(trayImgPath)
  tray.setToolTip('My Personal Manager')

  const trayTemplate: Array<(MenuItemConstructorOptions) | (MenuItem)> = [{
    label: 'Open main',
    click: () => {
      if (mainWindow)
        mainWindow.show()
      else {
        createMainWindow()
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
    label: 'Exit',
    click: () => {
      if (mainWindow && mainWindow.closable)
        mainWindow.close()
      if (managerWindow && managerWindow.closable)
        managerWindow.close()
    },
  }]

  // If Main window ex, add close
  if (mainWindow) {
    trayTemplate.push({
      label: 'Close main',
      click: () => {
        if (mainWindow && mainWindow.closable) {
          mainWindow.close()
        }
      },
    },)
  }

  // If Manager window ex, add close
  if (managerWindow) {
    trayTemplate.push({
      label: 'Close Manager',
      click: () => {
        if (managerWindow && managerWindow.closable) {
          managerWindow.close()
        }
      },
    },)
  }

  const contextMenuList = Menu.buildFromTemplate(trayTemplate)
  tray.setContextMenu(contextMenuList)
}
