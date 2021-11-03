"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const electron_1 = require("electron");
const fs_1 = __importDefault(require("fs"));
const store_1 = require("./store");
const isDev = true;
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
            nodeIntegration: true,
            contextIsolation: false,
        }
    });
    mainWindow.loadURL('http://localhost:3000');
    if (isDev) {
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
                nodeIntegration: true,
                contextIsolation: false,
            }
        });
        managerWindow.loadURL(isDev ? 'http://localhost:3000/overlay/manger/' : 'dist/index.html');
        console.log(store_1.electronStore.get('manager'));
        electron_1.ipcMain.emit('sync-manager', store_1.electronStore.get('manager'));
        mainWindow.webContents.emit('sync-manager');
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
    !fs_1.default.existsSync('configs') && fs_1.default.mkdirSync(path_1.default.join(__dirname, 'data'));
    // if (!fs.existsSync(path.join(__dirname, 'data/defaultManager.json'))) {
    //   fs.writeFile(path.join(__dirname, 'data/defaultManager.json'), JSON.stringify({ 'test' : 'test!' }), (err) => {
    //     if (err) {
    //       throw err
    //     }
    //   })
    // }
    /* If no data, set the data */
    if (!store_1.electronStore.get('manager')) {
        fs_1.default.readFile(path_1.default.join(__dirname, 'data/defaultManager.json'), 'utf-8', ((err, data) => {
            if (err)
                throw err;
            store_1.electronStore.set('manager', JSON.parse(data));
        }));
    }
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
    electron_1.ipcMain.on('open-manager', () => {
        createManagerWindow();
    });
});
electron_1.app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        electron_1.app.quit();
    }
});
//# sourceMappingURL=main.js.map