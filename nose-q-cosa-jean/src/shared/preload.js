import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('api', {
  readDir: (path) => {
    if (!path || typeof path !== 'string') {
      return Promise.reject(new Error('Ruta invalida'));
    }
    return ipcRenderer.invoke('read-dir', path);
  },
  
  readFile: (filePath) => {
    if (!filePath || typeof filePath !== 'string') {
      return Promise.reject(new Error('Ruta de archivo invalida'));
    }
    return ipcRenderer.invoke('read-file', filePath);
  },
  
  openMedia: (filePath, theme) => {
    if (!filePath || typeof filePath !== 'string') {
      return Promise.reject(new Error('Ruta de archivo invalida'));
    }
    return ipcRenderer.invoke('open-media', filePath, theme);
  },
  
  openImageViewer: (filePath, theme, fileName) => {
    if (!filePath || typeof filePath !== 'string') {
      return Promise.reject(new Error('Ruta de archivo invalida'));
    }
    return ipcRenderer.invoke('open-image-viewer', filePath, theme, fileName);
  },
  
  getHomePath: () => {
    return ipcRenderer.invoke('get-home-path');
  },
  
  getTheme: () => {
    return ipcRenderer.invoke('get-theme');
  }
});