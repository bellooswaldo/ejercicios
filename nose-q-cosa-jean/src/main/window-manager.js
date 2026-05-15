import { BrowserWindow } from 'electron';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { CONSTANTS } from '../shared/constants.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let mainWindow = null;
let activeWindows = new Set();

export function createMainWindow() {
  if (mainWindow !== null) {
    mainWindow.focus();
    return mainWindow;
  }

  mainWindow = new BrowserWindow({
    width: CONSTANTS.DEFAULT_WINDOW_WIDTH,
    height: CONSTANTS.DEFAULT_WINDOW_HEIGHT,
    webPreferences: {
      preload: path.join(__dirname, '../windows/file-explorer/preload.js'),
      nodeIntegration: false,
      contextIsolation: true
    },
    show: false
  });

  mainWindow.loadFile(path.join(__dirname, '../windows/file-explorer/index.html'));

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  activeWindows.add(mainWindow);
  return mainWindow;
}

export function createImageViewerWindow(filePath, theme, fileName) {
  const imageWindow = new BrowserWindow({
    width: CONSTANTS.IMAGE_VIEWER_WIDTH,
    height: CONSTANTS.IMAGE_VIEWER_HEIGHT,
    parent: mainWindow,
    modal: false,
    show: false,
    webPreferences: {
      preload: path.join(__dirname, '../windows/image-viewer/preload.js'),
      nodeIntegration: false,
      contextIsolation: true
    }
  });

  imageWindow.loadFile(path.join(__dirname, '../windows/image-viewer/index.html'));

  imageWindow.once('ready-to-show', () => {
    imageWindow.show();
    imageWindow.webContents.send('image-data', { filePath, theme, fileName });
  });

  imageWindow.on('closed', () => {
    activeWindows.delete(imageWindow);
  });

  activeWindows.add(imageWindow);
  return imageWindow;
}

export function createErrorDialog(title, message, theme) {
  const errorWindow = new BrowserWindow({
    width: CONSTANTS.ERROR_DIALOG_WIDTH,
    height: CONSTANTS.ERROR_DIALOG_HEIGHT,
    parent: mainWindow,
    modal: true,
    show: false,
    webPreferences: {
      preload: path.join(__dirname, '../windows/error-dialog/preload.js'),
      nodeIntegration: false,
      contextIsolation: true
    }
  });

  errorWindow.loadFile(path.join(__dirname, '../windows/error-dialog/index.html'));

  errorWindow.once('ready-to-show', () => {
    errorWindow.show();
    errorWindow.webContents.send('error-data', { title, message, theme });
  });

  errorWindow.on('closed', () => {
    activeWindows.delete(errorWindow);
  });

  activeWindows.add(errorWindow);
  return errorWindow;
}

export function getMainWindow() {
  return mainWindow;
}