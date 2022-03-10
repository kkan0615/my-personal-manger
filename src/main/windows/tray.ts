/* Tray */
import { Menu, Tray, MenuItemConstructorOptions, MenuItem } from 'electron'
import { destroyManagerWindow, openManagerWindow } from './manager'
import { destroyAppWindow, openAppWindow } from './app'
import { destroyScheduleWindow } from './schedule'
import path from 'path'
import isDev from 'electron-is-dev'

/* Tray instance */
export let tray: Tray

export const createTray = () => {
  const trayImgPath = isDev
    ? path.join(__dirname, '..', 'assets', 'tray.png')
    : path.join(process.resourcesPath, 'assets', 'tray.png')
  tray = new Tray(trayImgPath)

  tray.setToolTip('My Personal Manager')

  const trayTemplate: Array<(MenuItemConstructorOptions) | (MenuItem)> = [
    {
      label: 'Open app',
      click: () => {
        openAppWindow()
      },
    },
    {
      label: 'Open Manager',
      click: () => {
        openManagerWindow()
      },
    },
    {
      label: 'Exit',
      click: () => {
        destroyAppWindow()
        destroyManagerWindow()
        destroyScheduleWindow()
      },
    }]

  const contextMenuList = Menu.buildFromTemplate(trayTemplate)
  tray.setContextMenu(contextMenuList)
}
