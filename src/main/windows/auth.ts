import { BrowserWindow } from 'electron'
import path from 'path'
import isDev from 'electron-is-dev'

export let authWindow: BrowserWindow | undefined

export const createAuthWindow = () => {
  authWindow = new BrowserWindow({
    width: 400,
    height: 500,
    transparent: true,
    autoHideMenuBar: true,
    maximizable: true,
    resizable: true,
    movable: true,
    webPreferences: {
      preload: path.join(__dirname, '../', 'preload.js'),
      nodeIntegration: true,
      contextIsolation: false,
    }
  })

  authWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../../../dist/index.html')}`)

  authWindow.webContents.on('did-frame-finish-load', () => {
    if (authWindow) {
      authWindow.webContents.send('move-register')
    }
  })

  if (isDev) {
    authWindow.webContents.openDevTools()
  }

  authWindow.on('closed', () => {
    authWindow = undefined
  })
}
