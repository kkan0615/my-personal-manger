import path from 'path'
import { app, BrowserWindow, Tray, Menu, ipcMain } from 'electron'
import fs from 'fs'
import { electronStore } from './store'

const isDev = true

/* Main */
let mainWindow: BrowserWindow
/* Manager */
let managerWindow: BrowserWindow
/* Tray */
let tray: Tray

const createMainWindow = () => {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 720,
    transparent: true,
    webPreferences: {
      // preload: path.join(__dirname, 'preload.ts'),
      nodeIntegration: true,
      contextIsolation: false,
    }
  })

  mainWindow.loadURL('http://localhost:3000')
  if (isDev) {
    mainWindow.webContents.openDevTools()
  }
}

const createManagerWindow = () => {
  if (!managerWindow || managerWindow.isDestroyed()) {
    managerWindow = new BrowserWindow({
      transparent: true,
      frame: false,
      alwaysOnTop: true,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
      }
    })

    managerWindow.loadURL(isDev ? 'http://localhost:3000/overlay/manger/' : 'dist/index.html')
    console.log(electronStore.get('manager'))
    ipcMain.emit('sync-manager', electronStore.get('manager'))
    mainWindow.webContents.emit('sync-manager')
  }
}

const createTray = () => {
  tray = new Tray(path.join(__dirname, '/assets/tray.jpg'))
  tray.setToolTip('My Personal Manager')

  const contextMenuList = Menu.buildFromTemplate([{
    label: 'Open main',
    click: () => {
      mainWindow.show()
    },
  }, {
    label: 'Open Manager',
    click: () => {
      if (managerWindow)
        managerWindow.show()
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
    !fs.existsSync('configs') && fs.mkdirSync(path.join(__dirname, 'data'))

    // if (!fs.existsSync(path.join(__dirname, 'data/defaultManager.json'))) {
    //   fs.writeFile(path.join(__dirname, 'data/defaultManager.json'), JSON.stringify({ 'test' : 'test!' }), (err) => {
    //     if (err) {
    //       throw err
    //     }
    //   })
    // }
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
  ipcMain.on('open-manager', () => {
    createManagerWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
