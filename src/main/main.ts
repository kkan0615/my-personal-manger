import path from 'path'
import fs from 'fs'
import { app, BrowserWindow, ipcMain, IpcMainEvent, Menu, screen, Tray } from 'electron'
import { electronStore } from './store'
import isDev from 'electron-is-dev'
import { StoreKeyEnum } from './types/store'
import {
  createManager,
  createManagerMainImage,
  getManagerCircleImage,
  getManagerImage,
  getManagerList
} from './services/manager'
import { Manager, ManagerCreateForm } from './types/models/Manager'
import { User } from '../renderer/types/models/User'
import { v4 } from 'uuid'
import dayjs from 'dayjs'
import { authWindow, createAuthWindow } from './windows/auth'
import { ManagerConfig } from './types/models/Manager/config'
import { createManagerWindow, managerWindow } from './windows/manager'
import { createMainWindow, mainWindow } from './windows/mainWindow'

// const isDev = false


/* Tray */
let tray: Tray

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
    return electronStore.get(StoreKeyEnum.MANAGER_CONFIG)
  })

  ipcMain.on('set-manger-id', (event, args: string) => {
    electronStore.set(StoreKeyEnum.MANAGER_ID, args)
  })

  ipcMain.on('clear-manager-id', () => {
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
  ipcMain.handle('get-manager-image', getManagerImage)

  /*  Get circle size image */
  ipcMain.handle('get-manager-circle-image', getManagerCircleImage)

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
