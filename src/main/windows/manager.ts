import { BrowserWindow, ipcMain, screen } from 'electron'
import path from 'path'
import isDev from 'electron-is-dev'
import {
  closeManagerWindow,
  managerThroughOff,
  managerThroughOn,
  moveMangerScreen,
  stopMoveMangerScreen
} from '../services/managerWindow'

export let managerWindow: BrowserWindow | undefined

export const createManagerWindow = () => {
  if (!managerWindow || managerWindow.isDestroyed()) {
    const primaryDisplay = screen.getPrimaryDisplay()
    const width = 400
    const height = 350

    managerWindow = new BrowserWindow({
      width,
      height,
      frame: false,
      alwaysOnTop: true,
      transparent: true,
      backgroundColor: undefined,
      hasShadow: true,
      webPreferences: {
        preload: path.join(__dirname, 'preload.js'),
        nodeIntegration: true,
        contextIsolation: false,
      }
    })
    managerWindow.setIgnoreMouseEvents(true, { forward: true })
    managerWindow.setPosition(primaryDisplay.size.width - width, primaryDisplay.size.height - height - 50)

    managerWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../../dist/index.html')}`)
    managerWindow.webContents.on('did-frame-finish-load', () => {
      if (managerWindow) {
        managerWindow.webContents.send('move-manager')
      }
    })

    ipcMain.on('manager-move-screen', moveMangerScreen)
    ipcMain.on('manager-stop-move-screen', stopMoveMangerScreen)

    ipcMain.on('manager-through-on', managerThroughOn)

    ipcMain.on('manager-through-off', managerThroughOff)

    ipcMain.on('close-manager-window', closeManagerWindow)

    if (isDev) {
      managerWindow.setIgnoreMouseEvents(false, { forward: false })
      managerWindow.webContents.openDevTools()
    }

    /* When manager window is closed */
    if (managerWindow) {
      managerWindow.on('closed', () => {
        managerWindow = undefined
        /* Remove all listener */
        ipcMain.removeListener('manager-move-screen', moveMangerScreen)
        ipcMain.removeListener('close-manager-window', closeManagerWindow)
        ipcMain.removeListener('manager-through-on', managerThroughOn)
        ipcMain.removeListener('manager-through-off', managerThroughOff)
      })
    }
  }
}
