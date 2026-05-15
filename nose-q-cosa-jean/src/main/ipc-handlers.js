import { ipcMain } from 'electron';
import { readDirectory, readFileContent } from '../services/file-system.js';
import { openMedia } from '../services/media-handler.js';
import { createImageViewerWindow, createErrorDialog } from './window-manager.js';
import { getTheme, setTheme, getAccentColor, setAccentColor } from '../services/config-store.js';

export function registerIpcHandlers() {
  // Leer directorio
  ipcMain.handle('read-dir', async (event, dirPath) => {
    try {
      return await readDirectory(dirPath);
    } catch (error) {
      throw new Error(`No se pudo leer el directorio: ${error.message}`);
    }
  });

  // Leer archivo de texto
  ipcMain.handle('read-file', async (event, filePath) => {
    try {
      return await readFileContent(filePath);
    } catch (error) {
      throw new Error(`Error al leer el archivo: ${error.message}`);
    }
  });

  // Abrir multimedia (imagen o video)
  ipcMain.handle('open-media', async (event, filePath, theme) => {
    try {
      const result = await openMedia(filePath, theme);
      return result;
    } catch (error) {
      throw new Error(`Error al abrir multimedia: ${error.message}`);
    }
  });

  // Abrir visor de imagen dedicado
  ipcMain.handle('open-image-viewer', (event, filePath, theme, fileName) => {
    try {
      createImageViewerWindow(filePath, theme, fileName);
      return { success: true };
    } catch (error) {
      throw new Error(`Error al abrir visor de imagen: ${error.message}`);
    }
  });

  // Mostrar diálogo de error
  ipcMain.handle('show-error-dialog', (event, title, message, theme) => {
    try {
      createErrorDialog(title, message, theme);
      return { success: true };
    } catch (error) {
      console.error('Error al mostrar diálogo:', error);
      return { success: false };
    }
  });

  // Obtener ruta del home del usuario
  ipcMain.handle('get-home-path', () => {
    return process.env.HOME || process.env.USERPROFILE || '/';
  });

  // Gestión de tema
  ipcMain.handle('get-theme', () => {
    return getTheme();
  });

  ipcMain.handle('set-theme', (event, theme) => {
    setTheme(theme);
    return true;
  });

  // Gestión de color de acento
  ipcMain.handle('get-accent-color', () => {
    return getAccentColor();
  });

  ipcMain.handle('set-accent-color', (event, color) => {
    setAccentColor(color);
    return true;
  });
}