import { BrowserWindow, ipcMain } from 'electron'
import path from 'path'
import isDev from 'electron-is-dev'
import { electronStore } from '../store'
import { ManagerWindowConfig } from '../types/configs/managerWindow'

/* Manager */
export let managerWindow: BrowserWindow | undefined

export const createManagerWindow = () => {
  const managerWindowConfig = electronStore.get('managerWindow') as ManagerWindowConfig
  managerWindow = new BrowserWindow({
    title: 'Manager',
    width: 300,
    height: 350,
    x: managerWindowConfig ? managerWindowConfig.x : undefined,
    y: managerWindowConfig ? managerWindowConfig.y : undefined,
    alwaysOnTop: true,
    autoHideMenuBar: true,
    maximizable: true,
    resizable: true,
    transparent: true,
    backgroundColor: undefined,
    hasShadow: true,
    frame: false,

    webPreferences: {
      preload: path.join(__dirname, '../preload.js'),
      nodeIntegration: true,
      contextIsolation: false,
    }
  })
  // `file://${path.join(__dirname, '../../../../../../../dist/index.html')}`
  managerWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../../../../../../../dist/index.html')}`)

  managerWindow.webContents.once('did-finish-load', () => {
    if (managerWindow) {
      managerWindow.webContents.send('redirect-to-manager')
    }
  })
  // managerWindow.maximize()
  // if (isDev) {
  managerWindow.webContents.openDevTools()
  // }

  ipcMain.on('through-on-manager-window', throughOnManagerWindow)
  ipcMain.on('through-off-manager-window', throughOffManagerWindow)

  managerWindow.on('closed', () => {
    ipcMain.off('through-on-manager-window', throughOnManagerWindow)
    ipcMain.off('through-off-manager-window', throughOffManagerWindow)
    managerWindow = undefined
  })

  managerWindow.on('moved', () => {
    if (managerWindow) {
      // Save the last moved position
      const [x, y] = managerWindow.getPosition()
      electronStore.set('managerWindow.x', x)
      electronStore.set('managerWindow.y', y)
    }
  })
  // managerWindow.setIgnoreMouseEvents(true, { forward: true })
}

export const openManagerWindow = () => {
  if (!managerWindow) {
    createManagerWindow()
  } else {
    managerWindow.focus()
  }
}

export const destroyManagerWindow = () => {
  if (managerWindow) {
    managerWindow.destroy()
  }
}

export const throughOnManagerWindow = () => {
  if (managerWindow) {
    managerWindow.setIgnoreMouseEvents(true, { forward: true })
  }
}

export const throughOffManagerWindow = () => {
  if (managerWindow) {
    managerWindow.setIgnoreMouseEvents(false, { forward: false })
  }
}
