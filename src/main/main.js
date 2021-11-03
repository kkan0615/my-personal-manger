"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const electron_1 = require("electron");
const store_1 = require("./store");
const electron_is_dev_1 = __importDefault(require("electron-is-dev"));
// const isDev = false
/* Main */
let mainWindow;
/* Manager */
let managerWindow;
/* Tray */
let tray;
const createMainWindow = () => {
    mainWindow = new electron_1.BrowserWindow({
        width: 1280,
        height: 720,
        transparent: true,
        webPreferences: {
            // preload: path.join(__dirname, 'preload.ts'),
            webSecurity: false,
            nodeIntegration: true,
            contextIsolation: false,
        }
    });
    // mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '..', '..', 'dist', 'index.html')}`)
    mainWindow.loadURL(electron_is_dev_1.default ? 'http://localhost:3000' : '../dist/index/html');
    if (electron_is_dev_1.default) {
        mainWindow.webContents.openDevTools();
    }
};
const createManagerWindow = () => {
    if (!managerWindow || managerWindow.isDestroyed()) {
        managerWindow = new electron_1.BrowserWindow({
            transparent: true,
            frame: false,
            alwaysOnTop: true,
            webPreferences: {
                webSecurity: false,
                nodeIntegration: true,
                contextIsolation: false,
            }
        });
        // managerWindow.loadURL(isDev ? 'http://localhost:3000/overlay/manger/' : `file://${path.join(__dirname, '..', '..', 'dist', 'index.html')}`)
        managerWindow.loadURL(electron_is_dev_1.default ? 'http://localhost:3000/overlay/manger/' : '../dist/index/html');
        if (electron_is_dev_1.default) {
            managerWindow.webContents.openDevTools();
        }
        console.log(store_1.electronStore.get('manager'));
    }
};
const createTray = () => {
    tray = new electron_1.Tray(path_1.default.join(__dirname, '/assets/tray.jpg'));
    tray.setToolTip('My Personal Manager');
    const contextMenuList = electron_1.Menu.buildFromTemplate([{
            label: 'Open main',
            click: () => {
                mainWindow.show();
            },
        }, {
            label: 'Open Manager',
            click: () => {
                if (managerWindow)
                    managerWindow.show();
            },
        }, {
            label: 'Exit',
            click: () => {
                if (mainWindow && mainWindow.closable)
                    mainWindow.close();
                if (managerWindow && managerWindow.closable)
                    managerWindow.close();
            },
        }]);
    tray.setContextMenu(contextMenuList);
};
electron_1.app.whenReady()
    .then(() => {
    /* Check config file and remove */
    // !fs.existsSync('configs') && fs.mkdirSync(path.join(__dirname, 'data'))
    //
    // /* If no data, set the data */
    // if (!electronStore.get('manager')) {
    //   fs.readFile(path.join(__dirname, 'data/defaultManager.json'), 'utf-8', ((err, data) => {
    //     if (err) throw err
    //     electronStore.set('manager', JSON.parse(data))
    //   }))
    // }
    createMainWindow();
    createTray();
    electron_1.ipcMain.emit('sync-manager', store_1.electronStore.get('manager'));
    electron_1.app.on('activate', () => {
        if (!electron_1.BrowserWindow.getAllWindows().length) {
            createMainWindow();
        }
    });
});
electron_1.app.on('ready', () => {
    /* Open manager */
    electron_1.ipcMain.on('open-manager', (event) => {
        createManagerWindow();
        // event.sender.send('sync-manager')
    });
    electron_1.ipcMain.on('sync-manager', (event, args) => {
        event.sender.send('sync-manager', store_1.electronStore.get('manager'));
    });
});
electron_1.app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        electron_1.app.quit();
    }
});
//# sourceMappingURL=main.js.map