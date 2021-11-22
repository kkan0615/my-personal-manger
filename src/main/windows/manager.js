"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createManagerWindow = exports.managerWindow = void 0;
const electron_1 = require("electron");
const path_1 = __importDefault(require("path"));
const electron_is_dev_1 = __importDefault(require("electron-is-dev"));
const managerWindow_1 = require("../services/managerWindow");
const createManagerWindow = () => {
    if (!exports.managerWindow || exports.managerWindow.isDestroyed()) {
        const primaryDisplay = electron_1.screen.getPrimaryDisplay();
        const width = 400;
        const height = 350;
        exports.managerWindow = new electron_1.BrowserWindow({
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
        exports.managerWindow.setIgnoreMouseEvents(true, { forward: true });
        exports.managerWindow.setPosition(primaryDisplay.size.width - width, primaryDisplay.size.height - height - 50);
        exports.managerWindow.loadURL(electron_is_dev_1.default ? 'http://localhost:3000' : `file://${path_1.default.join(__dirname, '../../dist/index.html')}`);
        exports.managerWindow.webContents.on('did-frame-finish-load', () => {
            if (exports.managerWindow) {
                exports.managerWindow.webContents.send('move-manager');
            }
        });
        electron_1.ipcMain.on('manager-move-screen', managerWindow_1.moveMangerScreen);
        electron_1.ipcMain.on('manager-stop-move-screen', managerWindow_1.stopMoveMangerScreen);
        electron_1.ipcMain.on('manager-through-on', managerWindow_1.managerThroughOn);
        electron_1.ipcMain.on('manager-through-off', managerWindow_1.managerThroughOff);
        electron_1.ipcMain.on('close-manager-window', managerWindow_1.closeManagerWindow);
        if (electron_is_dev_1.default) {
            exports.managerWindow.setIgnoreMouseEvents(false, { forward: false });
            exports.managerWindow.webContents.openDevTools();
        }
        /* When manager window is closed */
        if (exports.managerWindow) {
            exports.managerWindow.on('closed', () => {
                exports.managerWindow = undefined;
                /* Remove all listener */
                electron_1.ipcMain.removeListener('manager-move-screen', managerWindow_1.moveMangerScreen);
                electron_1.ipcMain.removeListener('close-manager-window', managerWindow_1.closeManagerWindow);
                electron_1.ipcMain.removeListener('manager-through-on', managerWindow_1.managerThroughOn);
                electron_1.ipcMain.removeListener('manager-through-off', managerWindow_1.managerThroughOff);
            });
        }
    }
};
exports.createManagerWindow = createManagerWindow;
//# sourceMappingURL=manager.js.map