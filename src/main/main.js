"use strict";
exports.__esModule = true;
var path = require("path");
var electron_1 = require("electron");
var isDev = true;
/* Main */
var mainWindow;
/* Manager */
var managerWindow;
/* Tray */
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
    if (!managerWindow || managerWindow.isDestroyed()) {
        managerWindow = new electron_1.BrowserWindow({
            transparent: true,
            frame: false,
            alwaysOnTop: true,
            webPreferences: {
                nodeIntegration: true,
                contextIsolation: false
            }
        });
        managerWindow.loadURL('http://localhost:3000/overlay/manger/');
    }
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
    /* Open manager */
    electron_1.ipcMain.on('open-manager', function () {
        createManagerWindow();
    });
});
electron_1.app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        electron_1.app.quit();
    }
});
