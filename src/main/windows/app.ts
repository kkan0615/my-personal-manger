import { BrowserWindow } from 'electron'
import path from 'path'
import isDev from 'electron-is-dev'

/* App */
export let appWindow: BrowserWindow | undefined

export const createAppWindow = () => {
  appWindow = new BrowserWindow({
    title: 'App',
    width: 960,
    height: 540,
    autoHideMenuBar: true,
    maximizable: true,
    resizable: true,
    webPreferences: {
      preload: path.join(__dirname, '../preload.js'),
      nodeIntegration: true,
      contextIsolation: false,
    }
  })
  console.log(__dirname)
  // `file://${path.join(__dirname, '../../../../../../../dist/index.html')}`
  appWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../../../../../../../dist/index.html')}`)

  appWindow.webContents.once('did-finish-load', () => {
    if (appWindow) {
      appWindow.webContents.send('redirect-to-app')
    }
  })

  // if (isDev) {
  appWindow.webContents.openDevTools()
  // }

  appWindow.on('closed', () => {
    appWindow = undefined
  })
}


export const openAppWindow = () => {
  if (!appWindow) {
    createAppWindow()
  } else {
    appWindow.focus()
  }
}

export const destroyAppWindow = () => {
  if (appWindow) {
    appWindow.destroy()
  }
}
