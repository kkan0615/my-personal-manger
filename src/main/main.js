"use strict";
exports.__esModule = true;
/**
 * @TODO
 * 1. const require to import from
 * 2. Set the type well!
 */
var path = require("path");
var electron_1 = require("electron");
var isDev = true;
var mainWindow;
var managerWindow;
var tray;
var createMainWindow = function () {
    mainWindow = new electron_1.BrowserWindow({
        width: 1280,
        height: 720,
        transparent: true,
        webPreferences: {
            // preload: path.join(__dirname, 'preload.ts'),
            nodeIntegration: true,
            contextIsolation: false
        }
    });
    mainWindow.loadURL('http://localhost:3000');
    if (isDev) {
        mainWindow.webContents.openDevTools();
    }
};
var createManagerWindow = function () {
    managerWindow = new electron_1.BrowserWindow({
        // width: 800,
        // height: 600,
        transparent: true,
        frame: false,
        alwaysOnTop: true,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });
    managerWindow.loadURL('http://localhost:3000/overlay/manger/');
};
var createTray = function () {
    tray = new electron_1.Tray(path.join(__dirname, '/assets/tray.jpg'));
    tray.setToolTip('My Personal Manager');
    var contextMenuList = electron_1.Menu.buildFromTemplate([{
            label: 'Open main',
            click: function () {
                mainWindow.show();
            }
        }, {
            label: 'Open Manager',
            click: function () {
                if (managerWindow)
                    managerWindow.show();
            }
        }, {
            label: 'Exit',
            click: function () {
                if (mainWindow && mainWindow.closable)
                    mainWindow.close();
                if (managerWindow && managerWindow.closable)
                    managerWindow.close();
            }
        }]);
    tray.setContextMenu(contextMenuList);
};
electron_1.app.whenReady()
    .then(function () {
    createMainWindow();
    createTray();
    electron_1.app.on('activate', function () {
        if (!electron_1.BrowserWindow.getAllWindows().length) {
            createMainWindow();
        }
    });
});
electron_1.app.on('ready', function () {
    electron_1.ipcMain.on('open-manager', function (event, args) {
        console.log('event', event);
        console.log('args', args);
        createManagerWindow();
    });
});
electron_1.app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        electron_1.app.quit();
    }
});
