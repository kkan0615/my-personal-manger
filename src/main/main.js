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
            preload: path_1.default.join(__dirname, 'preload.js'),
            nodeIntegration: true,
            contextIsolation: false,
        }
    });
    mainWindow.loadURL(electron_is_dev_1.default ? 'http://localhost:3000' : `file://${path_1.default.join(__dirname, '../../dist/index.html')}`);
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
        const width = 300;
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
        // managerWindow.setIgnoreMouseEvents(true, { forward: true })
        managerWindow.setPosition(primaryDisplay.size.width - width, primaryDisplay.size.height - height - 50);
        managerWindow.loadURL(electron_is_dev_1.default ? 'http://localhost:3000' : `file://${path_1.default.join(__dirname, '../../dist/index.html')}`);
        managerWindow.webContents.on('did-finish-load', () => {
            if (managerWindow) {
                managerWindow.webContents.send('move-manager');
            }
        });
        const moveMangerScreen = (event, args) => {
            const cursorScreenPoint = electron_1.screen.getCursorScreenPoint();
            if (managerWindow) {
                managerWindow.setPosition(cursorScreenPoint.x - args.x, cursorScreenPoint.y - args.y);
            }
        };
        electron_1.ipcMain.on('manager-move-screen', moveMangerScreen);
        managerWindow.on('closed', () => {
            electron_1.ipcMain.removeListener('manager-move-screen', moveMangerScreen);
        });
        if (electron_is_dev_1.default) {
            managerWindow.webContents.openDevTools();
        }
        if (managerWindow) {
            managerWindow.on('closed', () => {
                managerWindow = undefined;
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
    //
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
    electron_1.ipcMain.on('open-manager', (event) => {
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