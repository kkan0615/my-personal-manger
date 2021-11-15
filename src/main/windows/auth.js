"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAuthWindow = exports.authWindow = void 0;
const electron_1 = require("electron");
const path_1 = __importDefault(require("path"));
const electron_is_dev_1 = __importDefault(require("electron-is-dev"));
const createAuthWindow = () => {
    exports.authWindow = new electron_1.BrowserWindow({
        width: 400,
        height: 500,
        transparent: true,
        autoHideMenuBar: true,
        maximizable: true,
        resizable: true,
        movable: true,
        webPreferences: {
            preload: path_1.default.join(__dirname, '../', 'preload.js'),
            nodeIntegration: true,
            contextIsolation: false,
        }
    });
    exports.authWindow.loadURL(electron_is_dev_1.default ? 'http://localhost:3000' : `file://${path_1.default.join(__dirname, '../../../dist/index.html')}`);
    exports.authWindow.webContents.on('did-frame-finish-load', () => {
        if (exports.authWindow) {
            exports.authWindow.webContents.send('move-register');
        }
    });
    if (electron_is_dev_1.default) {
        exports.authWindow.webContents.openDevTools();
    }
    exports.authWindow.on('closed', () => {
        exports.authWindow = undefined;
    });
};
exports.createAuthWindow = createAuthWindow;
//# sourceMappingURL=auth.js.map