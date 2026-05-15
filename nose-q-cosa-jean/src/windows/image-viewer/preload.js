const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  onImageData: (callback) => {
    ipcRenderer.on('image-data', (event, data) => {
      callback(event, data);
    });
  },
  
  // Limpiar listener cuando sea necesario
  removeImageDataListener: () => {
    ipcRenderer.removeAllListeners('image-data');
  }
});