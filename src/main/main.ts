import path from 'path'
import fs from 'fs'
import { app, BrowserWindow, Tray, Menu, ipcMain, IpcMainEvent, screen } from 'electron'
import { electronStore } from './store'
import isDev from 'electron-is-dev'
import { StoreKeyEnum } from './types/store'

// const isDev = false

/* Main */
let mainWindow: BrowserWindow | undefined
/* Manager */
let managerWindow: BrowserWindow | undefined
/* Tray */
let tray: Tray

const createMainWindow = () => {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 720,
    transparent: true,
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: false,
    }
  })

  mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../../dist/index.html')}`)

  mainWindow.webContents.on('did-frame-finish-load', () => {
    if (mainWindow) {
      mainWindow.webContents.send('move-home')
    }
  })

  if (isDev) {
    mainWindow.webContents.openDevTools()
  }

  mainWindow.on('closed', () => {
    mainWindow = undefined
  })
}

const createManagerWindow = () => {
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

    /* Control moving */
    const moveMangerScreen = (event: IpcMainEvent, args: { x: number; y: number }) => {
      const cursorScreenPoint = screen.getCursorScreenPoint()
      if (managerWindow) {
        managerWindow.setPosition(cursorScreenPoint.x - args.x, cursorScreenPoint.y - args.y)
      }
    }
    ipcMain.on('manager-move-screen', moveMangerScreen)

    ipcMain.on('manager-through-on', () => {
      if (managerWindow) {
        managerWindow.setIgnoreMouseEvents(true, { forward: true })
      }
    })

    ipcMain.on('manager-through-off', () => {
      if (managerWindow) {
        managerWindow.setIgnoreMouseEvents(false, { forward: false })
      }
    })

    ipcMain.on('close-manager-window', () => {
      if (managerWindow && managerWindow.closable) {
        managerWindow.close()
      }
    })

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
        ipcMain.removeListener('close-manager-window', moveMangerScreen)
        ipcMain.removeListener('manager-through-on', moveMangerScreen)
        ipcMain.removeListener('manager-through-off', moveMangerScreen)
      })
    }
  }
}

const createTray = () => {
  tray = new Tray(path.join(__dirname, '/assets/tray.jpg'))
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
  }])
  tray.setContextMenu(contextMenuList)
}

app.whenReady()
  .then(() => {
    /* Check config file and remove */
    // !fs.existsSync('configs') && fs.mkdirSync(path.join(__dirname, 'data'))

    /* If no data, set the data */
    if (!electronStore.get(StoreKeyEnum.MANAGER)) {
      fs.readFile(path.join(__dirname, 'data/defaultManager.json'), 'utf-8', ((err, data) => {
        if (err) throw err
        electronStore.set('manager', JSON.parse(data))
      }))
    }

    if (!electronStore.get(StoreKeyEnum.MANAGER_CONFIG)) {
      fs.readFile(path.join(__dirname, 'data/defaultManagerConfig.json'), 'utf-8', ((err, data) => {
        if (err) throw err
        electronStore.set('manager', JSON.parse(data))
      }))
    }

    /* Open Main window */
    createMainWindow()
    /* Open tray */
    createTray()
    ipcMain.emit('sync-manager', electronStore.get('manager'))
    app.on('activate', () => {
      if (!BrowserWindow.getAllWindows().length) {
        createMainWindow()
      }
    })
  })

/* When app is ready to open */
app.on('ready', () => {
  /* Open manager */
  ipcMain.on('open-manager-window', () => {
    createManagerWindow()
  })

  ipcMain.on('sync-manager', (event) => {
    event.sender.send('sync-manager', electronStore.get('manager'))
  })
})

/* When all windows are closed */
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
