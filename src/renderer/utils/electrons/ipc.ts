const electron = window.require('electron')

export const openManagerWindow = () => {
  electron.ipcRenderer.send('open-manager')
}
