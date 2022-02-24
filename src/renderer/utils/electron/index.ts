import { IpcRenderer } from 'electron'

export const electron = window.require('electron')
export const ipcRenderer: IpcRenderer = electron.ipcRenderer
