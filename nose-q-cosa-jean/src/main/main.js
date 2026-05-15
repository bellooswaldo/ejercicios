import { app, Menu, BrowserWindow } from 'electron';
import { createMainWindow } from './window-manager.js';
import { registerIpcHandlers } from './ipc-handlers.js';

// Deshabilitar aceleración GPU para mejor compatibilidad
app.commandLine.appendSwitch('disable-gpu');
app.commandLine.appendSwitch('disable-software-rasterizer');
app.disableHardwareAcceleration();

// Evitar error de ventana en macOS
let mainWindow = null;

function init() {
  // Registrar todos los manejadores IPC
  registerIpcHandlers();
  
  // Crear ventana principal
  mainWindow = createMainWindow();
  
  // Eliminar menú por defecto
  Menu.setApplicationMenu(null);
  
  // Manejar activación en macOS (cuando se hace clic en el icono del dock)
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createMainWindow();
    }
  });
}

// Inicializar cuando Electron esté listo
app.whenReady().then(init);

// Salir cuando todas las ventanas estén cerradas (excepto en macOS)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});