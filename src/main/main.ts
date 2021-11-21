import path from 'path'
import fs from 'fs'
import { app, BrowserWindow, ipcMain, IpcMainEvent, Menu, screen, Tray } from 'electron'
import { electronStore } from './store'
import isDev from 'electron-is-dev'
import { StoreKeyEnum } from './types/store'
import { createManager, createManagerMainImage, getManagerList } from './services/manager'
import { Manager, ManagerCreateForm } from './types/models/Manager'
import { User } from '../renderer/types/models/User'
import { v4 } from 'uuid'
import dayjs from 'dayjs'
import { authWindow, createAuthWindow } from './windows/auth'
import { ManagerConfig } from './types/models/Manager/config'

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
    autoHideMenuBar: true,
    minWidth: 1024,
    minHeight: 576,
    maximizable: true,
    resizable: true,
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
        const newX = cursorScreenPoint.x - args.x
        const newY = cursorScreenPoint.y - args.y
        event.sender.send('manger-window-position-changing', {
          x: newX,
          y: newY,
        })
        managerWindow.setPosition(newX, newY)
      }
    }
    const stopMoveMangerScreen = (event: IpcMainEvent, args: { x: number; y: number }) => {
      const cursorScreenPoint = screen.getCursorScreenPoint()
      if (managerWindow) {
        const newX = cursorScreenPoint.x - args.x
        const newY = cursorScreenPoint.y - args.y
        event.sender.send('manger-window-position-changed', {
          x: newX,
          y: newY,
        })
        managerWindow.setPosition(newX, newY)
      }
    }
    ipcMain.on('manager-move-screen', moveMangerScreen)
    ipcMain.on('manager-stop-move-screen', stopMoveMangerScreen)

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
  const trayImgPath = isDev ? path.join(__dirname, '/default/tray.jpg') : path.join(process.resourcesPath, 'default', 'tray.jpg')
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

app.whenReady()
  .then(() => {
    /* Check config file and remove */
    // !fs.existsSync('configs') && fs.mkdirSync(path.join(__dirname, 'data'))

    /* If no data, set the data */
    if (!electronStore.get(StoreKeyEnum.MANAGER)) {
      const defaultManagerPath = isDev ? path.join(__dirname, 'default/defaultManager.json') : path.join(process.resourcesPath, 'default', 'defaultManager.json')
      fs.readFile(defaultManagerPath, 'utf-8', ((err, data) => {
        if (err) throw err
        electronStore.set('manager', JSON.parse(data))
      }))
    }

    if (!electronStore.get(StoreKeyEnum.MANAGER_CONFIG)) {
      const defaultManagerConfigPath = isDev ? path.join(__dirname, 'default/defaultManagerConfig.json') : path.join(process.resourcesPath, 'default', 'defaultManagerConfig.json')
      fs.readFile(defaultManagerConfigPath, 'utf-8', ((err, data) => {
        if (err) throw err
        electronStore.set('manager', JSON.parse(data))
      }))
    }

    if (electronStore.get(StoreKeyEnum.USER)) {
      /* Open Main window */
      createMainWindow()
      /* Open tray */
      createTray()
    } else {
      createAuthWindow()
    }
    ipcMain.emit('sync-manager', electronStore.get('manager'))
    app.on('activate', () => {
      if (!BrowserWindow.getAllWindows().length) {
        createMainWindow()
      }
    })
  })

/* When app is ready to open */
app.on('ready', () => {
  // @TODO: For test
  electronStore.set(StoreKeyEnum.MANAGER_ID, '13a6e982-f7c9-4f8a-b838-558740be6d7a')
  // electronStore.set(StoreKeyEnum.USER, {
  //   id: v4(),
  //   name: 'Youngjin',
  //   birthday: dayjs().year(1998).month(6).day(15)
  // } as User)
  electronStore.delete(StoreKeyEnum.USER)
  /* Open manager */
  ipcMain.on('open-manager-window', () => {
    createManagerWindow()
  })

  /* Handle */
  ipcMain.handle('sync-manager', () => {
    const managerId = electronStore.get(StoreKeyEnum.MANAGER_ID)
    if (managerId) {
      const managerPath = isDev ? path.join(__dirname, `data/${managerId}/manager.json`) : path.join(process.resourcesPath, `data/${managerId}/manager.json`)
      const fileData = fs.readFileSync(managerPath, 'utf-8')

      return JSON.parse(fileData)
    } else {
      const defaultManagerPath = isDev ? path.join(__dirname, 'default', 'defaultManager.json') : path.join(process.resourcesPath, 'default', 'defaultManager.json')
      const fileData = fs.readFileSync(defaultManagerPath, 'utf-8')

      return JSON.parse(fileData)
    }
  })

  ipcMain.handle('sync-manager-config', () => {
    const managerId = electronStore.get(StoreKeyEnum.MANAGER_ID)
    if (managerId) {
      const managerConfigPath = isDev ? path.join(__dirname, `data/${managerId}/managerConfig.json`) : path.join(process.resourcesPath, `data/${managerId}/managerConfig.json`)
      const fileData = fs.readFileSync(managerConfigPath, 'utf-8')

      return JSON.parse(fileData)
    } else {
      const defaultManagerConfigPath = isDev ? path.join(__dirname, 'default', 'defaultManagerConfig.json') : path.join(process.resourcesPath, 'default', 'defaultManagerConfig.json')
      const fileData = fs.readFileSync(defaultManagerConfigPath, 'utf-8')

      return JSON.parse(fileData)
    }
  })

  ipcMain.on('clear-managerId', () => {
    electronStore.delete(StoreKeyEnum.MANAGER_ID)
  })

  ipcMain.handle('get-user', () => {
    return electronStore.get(StoreKeyEnum.USER)
  })

  ipcMain.on('register-user', (event, args) => {
    electronStore.set(StoreKeyEnum.USER, args)
    createMainWindow()
    createTray()
    if (authWindow) {
      authWindow.destroy()
    }
  })

  ipcMain.on('set-user', (event, args: User) => {
    electronStore.set(StoreKeyEnum.USER, args)
  })

  /**
   * Get full size image
   */
  ipcMain.handle('get-manager-image', (event, args: Manager) => {
    let imgPath: string
    if (args && args.id) {
      imgPath = isDev ? path.join(__dirname, 'data', args.id, args.img) : path.join(process.resourcesPath, 'data', args.id, args.img)
    } else {
      imgPath = isDev ? path.join(__dirname, 'default', 'manager.png') : path.join(process.resourcesPath, 'default', 'manager.png')
    }
    return fs.readFileSync(imgPath)

  })

  /*  Get circle size image */
  ipcMain.handle('get-manager-circle-image', (event, args: Manager) => {
    let imgPath: string
    if (args && args.id) {
      imgPath = isDev ? path.join(__dirname, 'data', args.id, args.circleImg) : path.join(process.resourcesPath, 'data', args.id, args.circleImg)
    } else {
      imgPath = isDev ? path.join(__dirname, 'default', 'manager-circle.png') : path.join(process.resourcesPath, 'default', 'manager-circle.png')
    }

    return fs.readFileSync(imgPath)
  })

  /* Create manager slot */
  ipcMain.on('create-manager', async (event, args: ManagerCreateForm) => {
    const mangerId = await createManager(args)
    event.sender.send('success-create-manger', mangerId)
  })

  /* Create manager main image */
  ipcMain.on('create-manager-main-image', async (event, args: { id: string; file: File }) => {
    try {
      await createManagerMainImage(args.id, args.file)
    } catch (e) {
      console.error(e)
      event.sender.send('error-create', { code: 403 })
    }
  })
})

ipcMain.handle('get-manager-list', getManagerList)

ipcMain.on('update-manager-config-by-id', async (event, args: { id: string; config: ManagerConfig }) => {
  if (args.id) {
    const managerConfigPath = isDev ? path.join(__dirname, `data/${args.id}/managerConfig.json`) : path.join(process.resourcesPath, `data/${args.id}/managerConfig.json`)
    const fileData = fs.readFileSync(managerConfigPath, 'utf-8')
    if (fileData) {
      fs.writeFileSync(managerConfigPath, JSON.stringify(args.config))
      if (managerWindow) {
        managerWindow.setAlwaysOnTop(args.config.isAlwaysTop)
      }
    }
  }
})

/* When all windows are closed */
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
