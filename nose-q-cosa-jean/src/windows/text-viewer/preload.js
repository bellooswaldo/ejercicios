const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  onViewerData: (callback) => {
    ipcRenderer.on('viewer-data', (event, data) => callback(event, data));
  }
});