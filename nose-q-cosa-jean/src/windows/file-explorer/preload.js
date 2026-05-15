const { contextBridge, ipcRenderer } = require('electron');

// Exponer API segura al renderer
contextBridge.exposeInMainWorld('api', {
  // Navegación de archivos
  readDir: (path) => {
    if (!path || typeof path !== 'string') {
      return Promise.reject(new Error('Ruta inválida'));
    }
    return ipcRenderer.invoke('read-dir', path);
  },
  
  readFile: (filePath) => {
    if (!filePath || typeof filePath !== 'string') {
      return Promise.reject(new Error('Ruta de archivo inválida'));
    }
    return ipcRenderer.invoke('read-file', filePath);
  },
  
  // Multimedia
  openMedia: (filePath, theme) => {
    if (!filePath || typeof filePath !== 'string') {
      return Promise.reject(new Error('Ruta de archivo inválida'));
    }
    return ipcRenderer.invoke('open-media', filePath, theme);
  },
  
  openImageViewer: (filePath, theme, fileName) => {
    if (!filePath || typeof filePath !== 'string') {
      return Promise.reject(new Error('Ruta de archivo inválida'));
    }
    return ipcRenderer.invoke('open-image-viewer', filePath, theme, fileName);
  },
  
  showErrorDialog: (title, message, theme) => {
    return ipcRenderer.invoke('show-error-dialog', title, message, theme);
  },
  
  // Utilidades
  getHomePath: () => {
    return ipcRenderer.invoke('get-home-path');
  },
  
  // Configuración de tema
  getTheme: () => {
    return ipcRenderer.invoke('get-theme');
  },
  
  setTheme: (theme) => {
    return ipcRenderer.invoke('set-theme', theme);
  },
  
  getAccentColor: () => {
    return ipcRenderer.invoke('get-accent-color');
  },
  
  setAccentColor: (color) => {
    return ipcRenderer.invoke('set-accent-color', color);
  }
});