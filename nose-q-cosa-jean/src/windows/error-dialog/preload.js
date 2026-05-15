const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  onErrorData: (callback) => {
    ipcRenderer.on('error-data', (event, data) => {
      callback(event, data);
    });
  },
  
  removeErrorDataListener: () => {
    ipcRenderer.removeAllListeners('error-data');
  }
});