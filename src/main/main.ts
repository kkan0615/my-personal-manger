import path from 'path'
import fs from 'fs'
import { app, BrowserWindow, Tray, Menu, ipcMain, IpcMainEvent, screen } from 'electron'
import { electronStore } from './store'
import isDev from 'electron-is-dev'

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
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: false,
    }
  })

  mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../../dist/index.html')}`)
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
    const width = 300
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
    // managerWindow.setIgnoreMouseEvents(true, { forward: true })
    managerWindow.setPosition(primaryDisplay.size.width - width, primaryDisplay.size.height - height - 50)

    managerWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../../dist/index.html')}`)
    managerWindow.webContents.on('did-finish-load', () => {
      if (managerWindow) {
        managerWindow.webContents.send('move-manager')
      }
    })

    const moveMangerScreen = (event: IpcMainEvent, args: { x: number; y: number }) => {
      const cursorScreenPoint = screen.getCursorScreenPoint()
      if (managerWindow) {
        managerWindow.setPosition(cursorScreenPoint.x - args.x, cursorScreenPoint.y - args.y)
      }
    }
    ipcMain.on('manager-move-screen', moveMangerScreen)

    managerWindow.on('closed', () => {
      ipcMain.removeListener('manager-move-screen', moveMangerScreen)
    })

    if (isDev) {
      managerWindow.webContents.openDevTools()
    }

    if (managerWindow) {
      managerWindow.on('closed', () => {
        managerWindow = undefined
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
    //
    /* If no data, set the data */
    if (!electronStore.get('manager')) {
      fs.readFile(path.join(__dirname, 'data/defaultManager.json'), 'utf-8', ((err, data) => {
        if (err) throw err
        electronStore.set('manager', JSON.parse(data))
      }))
    }

    createMainWindow()
    createTray()
    ipcMain.emit('sync-manager', electronStore.get('manager'))
    app.on('activate', () => {
      if (!BrowserWindow.getAllWindows().length) {
        createMainWindow()
      }
    })
  })

app.on('ready', () => {
  /* Open manager */
  ipcMain.on('open-manager', (event) => {
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
