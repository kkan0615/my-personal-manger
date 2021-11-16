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
const manager_1 = require("./services/manager");
const auth_1 = require("./windows/auth");
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
        maximizable: true,
        resizable: true,
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
                const newX = cursorScreenPoint.x - args.x;
                const newY = cursorScreenPoint.y - args.y;
                event.sender.send('manger-window-position-changing', {
                    x: newX,
                    y: newY,
                });
                managerWindow.setPosition(newX, newY);
            }
        };
        const stopMoveMangerScreen = (event, args) => {
            const cursorScreenPoint = electron_1.screen.getCursorScreenPoint();
            if (managerWindow) {
                const newX = cursorScreenPoint.x - args.x;
                const newY = cursorScreenPoint.y - args.y;
                event.sender.send('manger-window-position-changed', {
                    x: newX,
                    y: newY,
                });
                managerWindow.setPosition(newX, newY);
            }
        };
        electron_1.ipcMain.on('manager-move-screen', moveMangerScreen);
        electron_1.ipcMain.on('manager-stop-move-screen', stopMoveMangerScreen);
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
    const trayImgPath = electron_is_dev_1.default ? path_1.default.join(__dirname, '/default/tray.jpg') : path_1.default.join(process.resourcesPath, 'default', 'tray.jpg');
    tray = new electron_1.Tray(trayImgPath);
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
            label: 'Close main',
            click: () => {
                if (mainWindow && mainWindow.closable) {
                    mainWindow.close();
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
            label: 'Close Manager',
            click: () => {
                if (managerWindow && managerWindow.closable) {
                    managerWindow.close();
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
        const defaultManagerPath = electron_is_dev_1.default ? path_1.default.join(__dirname, 'default/defaultManager.json') : path_1.default.join(process.resourcesPath, 'default', 'defaultManager.json');
        fs_1.default.readFile(defaultManagerPath, 'utf-8', ((err, data) => {
            if (err)
                throw err;
            store_1.electronStore.set('manager', JSON.parse(data));
        }));
    }
    if (!store_1.electronStore.get(store_2.StoreKeyEnum.MANAGER_CONFIG)) {
        const defaultManagerConfigPath = electron_is_dev_1.default ? path_1.default.join(__dirname, 'default/defaultManagerConfig.json') : path_1.default.join(process.resourcesPath, 'default', 'defaultManagerConfig.json');
        fs_1.default.readFile(defaultManagerConfigPath, 'utf-8', ((err, data) => {
            if (err)
                throw err;
            store_1.electronStore.set('manager', JSON.parse(data));
        }));
    }
    /* Open Main window */
    if (store_1.electronStore.get(store_2.StoreKeyEnum.USER)) {
        createMainWindow();
    }
    else {
        (0, auth_1.createAuthWindow)();
    }
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
    // @TODO: For test
    store_1.electronStore.set(store_2.StoreKeyEnum.MANAGER_ID, '13a6e982-f7c9-4f8a-b838-558740be6d7a');
    // electronStore.set(StoreKeyEnum.USER, {
    //   id: v4(),
    //   name: 'Youngjin',
    //   birthday: dayjs().year(1998).month(6).day(15)
    // } as User)
    store_1.electronStore.delete(store_2.StoreKeyEnum.USER);
    /* Open manager */
    electron_1.ipcMain.on('open-manager-window', () => {
        createManagerWindow();
    });
    /* Handle */
    electron_1.ipcMain.handle('sync-manager', () => {
        const managerId = store_1.electronStore.get(store_2.StoreKeyEnum.MANAGER_ID);
        if (managerId) {
            const managerPath = electron_is_dev_1.default ? path_1.default.join(__dirname, `data/${managerId}/manager.json`) : path_1.default.join(process.resourcesPath, `data/${managerId}/manager.json`);
            const fileData = fs_1.default.readFileSync(managerPath, 'utf-8');
            return JSON.parse(fileData);
        }
        else {
            const defaultManagerPath = electron_is_dev_1.default ? path_1.default.join(__dirname, 'default', 'defaultManager.json') : path_1.default.join(process.resourcesPath, 'default', 'defaultManager.json');
            const fileData = fs_1.default.readFileSync(defaultManagerPath, 'utf-8');
            return JSON.parse(fileData);
        }
    });
    electron_1.ipcMain.handle('sync-manager-config', () => {
        const managerId = store_1.electronStore.get(store_2.StoreKeyEnum.MANAGER_ID);
        if (managerId) {
            const managerConfigPath = electron_is_dev_1.default ? path_1.default.join(__dirname, `data/${managerId}/managerConfig.json`) : path_1.default.join(process.resourcesPath, `data/${managerId}/managerConfig.json`);
            const fileData = fs_1.default.readFileSync(managerConfigPath, 'utf-8');
            return JSON.parse(fileData);
        }
        else {
            const defaultManagerConfigPath = electron_is_dev_1.default ? path_1.default.join(__dirname, 'default', 'defaultManagerConfig.json') : path_1.default.join(process.resourcesPath, 'default', 'defaultManagerConfig.json');
            const fileData = fs_1.default.readFileSync(defaultManagerConfigPath, 'utf-8');
            return JSON.parse(fileData);
        }
    });
    electron_1.ipcMain.on('clear-managerId', (event) => {
        store_1.electronStore.delete(store_2.StoreKeyEnum.MANAGER_ID);
    });
    electron_1.ipcMain.handle('get-user', () => {
        return store_1.electronStore.get(store_2.StoreKeyEnum.USER);
    });
    electron_1.ipcMain.on('register-user', (event, args) => {
        store_1.electronStore.set(store_2.StoreKeyEnum.USER, args);
        createMainWindow();
        if (auth_1.authWindow) {
            auth_1.authWindow.destroy();
        }
    });
    electron_1.ipcMain.on('set-user', (event, args) => {
        store_1.electronStore.set(store_2.StoreKeyEnum.USER, args);
    });
    electron_1.ipcMain.handle('get-manager-list', () => {
        const dataDirPath = electron_is_dev_1.default ? path_1.default.join(__dirname, 'data') : path_1.default.join(process.resourcesPath, 'data');
        return fs_1.default.readdirSync(dataDirPath);
    });
    /**
     * Get full size image
     */
    electron_1.ipcMain.handle('get-manager-image', (event, args) => {
        let imgPath;
        if (args && args.id) {
            imgPath = electron_is_dev_1.default ? path_1.default.join(__dirname, 'data', args.id, args.img) : path_1.default.join(process.resourcesPath, 'data', args.id, args.img);
        }
        else {
            imgPath = electron_is_dev_1.default ? path_1.default.join(__dirname, 'default', 'manager.png') : path_1.default.join(process.resourcesPath, 'default', 'manager.png');
        }
        return fs_1.default.readFileSync(imgPath);
    });
    /*  Get circle size image */
    electron_1.ipcMain.handle('get-manager-circle-image', (event, args) => {
        let imgPath;
        if (args && args.id) {
            imgPath = electron_is_dev_1.default ? path_1.default.join(__dirname, 'data', args.id, args.circleImg) : path_1.default.join(process.resourcesPath, 'data', args.id, args.circleImg);
        }
        else {
            imgPath = electron_is_dev_1.default ? path_1.default.join(__dirname, 'default', 'manager-circle.png') : path_1.default.join(process.resourcesPath, 'default', 'manager-circle.png');
        }
        return fs_1.default.readFileSync(imgPath);
    });
    /* Create manager slot */
    electron_1.ipcMain.on('create-manager', async (event, args) => {
        const mangerId = await (0, manager_1.createManager)(args);
        event.sender.send('success-create-manger', mangerId);
    });
    /* Create manager main image */
    electron_1.ipcMain.on('create-manager-main-image', async (event, args) => {
        try {
            await (0, manager_1.createManagerMainImage)(args.id, args.file);
        }
        catch (e) {
            console.error(e);
            event.sender.send('error-create', { code: 403 });
        }
    });
});
/* When all windows are closed */
electron_1.app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        electron_1.app.quit();
    }
});
//# sourceMappingURL=main.js.map