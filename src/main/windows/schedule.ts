import { BrowserWindow, } from 'electron'
import path from 'path'
import isDev from 'electron-is-dev'
import { electronStore } from '../store'

/* Schedule */
export let scheduleWindow: BrowserWindow | undefined

export const createScheduleWindow = () => {
  scheduleWindow = new BrowserWindow({
    title: 'Schedule',
    width: 350,
    height: 500,
    alwaysOnTop: isDev,
    autoHideMenuBar: true,
    maximizable: true,
    resizable: true,
    transparent: true,
    backgroundColor: undefined,
    hasShadow: true,
    center: true,
    // frame: false,

    webPreferences: {
      preload: path.join(__dirname, '../preload.js'),
      nodeIntegration: true,
      contextIsolation: false,
    }
  })
  // `file://${path.join(__dirname, '../../../../../../../dist/index.html')}`
  scheduleWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../../../../../../../dist/index.html')}`)

  scheduleWindow.webContents.once('did-finish-load', () => {
    if (scheduleWindow) {
      scheduleWindow.webContents.send('redirect-to-schedule')
    }
  })
  // if (isDev) {
  scheduleWindow.webContents.openDevTools()
  // }

  scheduleWindow.on('closed', () => {
    scheduleWindow = undefined
  })

  scheduleWindow.on('moved', () => {
    if (scheduleWindow) {
      // Save the last moved position
      const [x, y] = scheduleWindow.getPosition()
      electronStore.set('scheduleWindow.x', x)
      electronStore.set('scheduleWindow.y', y)
    }
  })
  // scheduleWindow.setIgnoreMouseEvents(true, { forward: true })
}

export const openScheduleWindow = () => {
  if (!scheduleWindow) {
    createScheduleWindow()
  } else {
    scheduleWindow.focus()
  }
}

export const destroyScheduleWindow = () => {
  if (scheduleWindow) {
    scheduleWindow.destroy()
  }
}
