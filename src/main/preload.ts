// import { ipcRenderer } from 'electron'
// window.ipcRenderer = ipcRenderer

// import { contextBridge, ipcRenderer } from 'electron'

// global.exports = {}
//
window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector: any, text: any) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  for (const dependency of ['chrome', 'node', 'electron']) {
    replaceText(`${dependency}-version`, process.versions[dependency])
  }
})
//
// // Expose ipcRenderer to the client
// contextBridge.exposeInMainWorld('ipcRenderer', {
//   send: (channel: any, data: any) => {
//     const validChannels = ['nameOfClientChannel'] // <-- Array of all ipcRenderer Channels used in the client
//     if (validChannels.includes(channel)) {
//       ipcRenderer.send(channel, data)
//     }
//   },
//   receive: (channel: any, func: any) => {
//     const validChannels = ['nameOfElectronChannel'] // <-- Array of all ipcMain Channels used in the electron
//     if (validChannels.includes(channel)) {
//       // Deliberately strip event as it includes `sender`
//       ipcRenderer.on(channel, (event, ...args) => func(...args))
//     }
//   }
// })
