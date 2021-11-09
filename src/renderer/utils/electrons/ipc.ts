const electron = window.require('electron')

export const openManagerWindow = () => {
  electron.ipcRenderer.send('open-manager-window')
}

export const onMangerThrough = () => {
  electron.ipcRenderer.send('manager-through-on')
}

export const offMangerThrough = () => {
  electron.ipcRenderer.send('manager-through-off')
}
