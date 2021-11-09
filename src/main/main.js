"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const electron_1 = require("electron");
const store_1 = require("./store");
const electron_is_dev_1 = __importDefault(require("electron-is-dev"));
const store_2 = require("./types/store");
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
        autoHideMenuBar: true,
        webPreferences: {
            preload: path_1.default.join(__dirname, 'preload.js'),
            nodeIntegration: true,
            contextIsolation: false,
        }
    });
    mainWindow.loadURL(electron_is_dev_1.default ? 'http://localhost:3000' : `file://${path_1.default.join(__dirname, '../../dist/index.html')}`);
    mainWindow.webContents.on('did-frame-finish-load', () => {
        if (mainWindow) {
            mainWindow.webContents.send('move-home');
        }
    });
    if (electron_is_dev_1.default) {
        mainWindow.webContents.openDevTools();
    }
    mainWindow.on('closed', () => {
        mainWindow = undefined;
    });
};
const createManagerWindow = () => {
    if (!managerWindow || managerWindow.isDestroyed()) {
        const primaryDisplay = electron_1.screen.getPrimaryDisplay();
        const width = 400;
        const height = 350;
        managerWindow = new electron_1.BrowserWindow({
            width,
            height,
            frame: false,
            alwaysOnTop: true,
            transparent: true,
            backgroundColor: undefined,
            hasShadow: true,
            webPreferences: {
                preload: path_1.default.join(__dirname, 'preload.js'),
                nodeIntegration: true,
                contextIsolation: false,
            }
        });
        managerWindow.setIgnoreMouseEvents(true, { forward: true });
        managerWindow.setPosition(primaryDisplay.size.width - width, primaryDisplay.size.height - height - 50);
        managerWindow.loadURL(electron_is_dev_1.default ? 'http://localhost:3000' : `file://${path_1.default.join(__dirname, '../../dist/index.html')}`);
        managerWindow.webContents.on('did-frame-finish-load', () => {
            if (managerWindow) {
                managerWindow.webContents.send('move-manager');
            }
        });
        /* Control moving */
        const moveMangerScreen = (event, args) => {
            const cursorScreenPoint = electron_1.screen.getCursorScreenPoint();
            if (managerWindow) {
                managerWindow.setPosition(cursorScreenPoint.x - args.x, cursorScreenPoint.y - args.y);
            }
        };
        electron_1.ipcMain.on('manager-move-screen', moveMangerScreen);
        electron_1.ipcMain.on('manager-through-on', () => {
            if (managerWindow) {
                managerWindow.setIgnoreMouseEvents(true, { forward: true });
            }
        });
        electron_1.ipcMain.on('manager-through-off', () => {
            if (managerWindow) {
                managerWindow.setIgnoreMouseEvents(false, { forward: false });
            }
        });
        electron_1.ipcMain.on('close-manager-window', () => {
            if (managerWindow && managerWindow.closable) {
                managerWindow.close();
            }
        });
        if (electron_is_dev_1.default) {
            managerWindow.setIgnoreMouseEvents(false, { forward: false });
            managerWindow.webContents.openDevTools();
        }
        /* When manager window is closed */
        if (managerWindow) {
            managerWindow.on('closed', () => {
                managerWindow = undefined;
                /* Remove all listener */
                electron_1.ipcMain.removeListener('manager-move-screen', moveMangerScreen);
                electron_1.ipcMain.removeListener('close-manager-window', moveMangerScreen);
                electron_1.ipcMain.removeListener('manager-through-on', moveMangerScreen);
                electron_1.ipcMain.removeListener('manager-through-off', moveMangerScreen);
            });
        }
    }
};
const createTray = () => {
    tray = new electron_1.Tray(path_1.default.join(__dirname, '/assets/tray.jpg'));
    tray.setToolTip('My Personal Manager');
    const contextMenuList = electron_1.Menu.buildFromTemplate([{
            label: 'Open main',
            click: () => {
                if (mainWindow)
                    mainWindow.show();
                else {
                    createMainWindow();
                }
            },
        }, {
            label: 'Open Manager',
            click: () => {
                if (managerWindow)
                    managerWindow.show();
                else {
                    createManagerWindow();
                }
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
    /* If no data, set the data */
    if (!store_1.electronStore.get(store_2.StoreKeyEnum.MANAGER)) {
        fs_1.default.readFile(path_1.default.join(__dirname, 'data/defaultManager.json'), 'utf-8', ((err, data) => {
            if (err)
                throw err;
            store_1.electronStore.set('manager', JSON.parse(data));
        }));
    }
    if (!store_1.electronStore.get(store_2.StoreKeyEnum.MANAGER_CONFIG)) {
        fs_1.default.readFile(path_1.default.join(__dirname, 'data/defaultManagerConfig.json'), 'utf-8', ((err, data) => {
            if (err)
                throw err;
            store_1.electronStore.set('manager', JSON.parse(data));
        }));
    }
    /* Open Main window */
    createMainWindow();
    /* Open tray */
    createTray();
    electron_1.ipcMain.emit('sync-manager', store_1.electronStore.get('manager'));
    electron_1.app.on('activate', () => {
        if (!electron_1.BrowserWindow.getAllWindows().length) {
            createMainWindow();
        }
    });
});
/* When app is ready to open */
electron_1.app.on('ready', () => {
    /* Open manager */
    electron_1.ipcMain.on('open-manager-window', () => {
        createManagerWindow();
    });
    electron_1.ipcMain.on('sync-manager', (event) => {
        event.sender.send('sync-manager', store_1.electronStore.get('manager'));
    });
});
/* When all windows are closed */
electron_1.app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        electron_1.app.quit();
    }
});
//# sourceMappingURL=main.js.map