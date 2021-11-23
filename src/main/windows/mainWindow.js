"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMainWindow = exports.mainWindow = void 0;
const electron_1 = require("electron");
const path_1 = __importDefault(require("path"));
const electron_is_dev_1 = __importDefault(require("electron-is-dev"));
const createMainWindow = () => {
    exports.mainWindow = new electron_1.BrowserWindow({
        width: 1280,
        height: 720,
        autoHideMenuBar: true,
        minWidth: 1024,
        minHeight: 576,
        maximizable: true,
        resizable: true,
        webPreferences: {
            preload: path_1.default.join(__dirname, 'preload.js'),
            nodeIntegration: true,
            contextIsolation: false,
        }
    });
    exports.mainWindow.loadURL(electron_is_dev_1.default ? 'http://localhost:3000' : `file://${path_1.default.join(__dirname, '../../dist/index.html')}`);
    exports.mainWindow.webContents.on('did-frame-finish-load', () => {
        if (exports.mainWindow) {
            exports.mainWindow.webContents.send('move-home');
        }
    });
    if (electron_is_dev_1.default) {
        exports.mainWindow.webContents.openDevTools();
    }
    exports.mainWindow.on('closed', () => {
        exports.mainWindow = undefined;
    });
};
exports.createMainWindow = createMainWindow;
//# sourceMappingURL=mainWindow.js.map