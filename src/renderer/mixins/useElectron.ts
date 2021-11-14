import { IpcRenderer } from 'electron'

const electron = window.require('electron')

export default function () {
  const ipcRenderer: IpcRenderer = electron.ipcRenderer

  return {
    ipcRenderer,
  }
}
