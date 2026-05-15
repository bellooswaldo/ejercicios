import { spawn } from 'node:child_process';
import fsPromises from 'node:fs/promises';
import path from 'node:path';
import { findVlcPath } from './vlc-finder.js';
import { CONSTANTS } from '../shared/constants.js';
import { getFileExtension } from '../shared/utils.js';

export async function openMedia(filePath, theme) {
  try {
    // Verificar que el archivo existe y se puede leer
    await fsPromises.access(filePath, fsPromises.constants.R_OK);
    
    const fileName = path.basename(filePath);
    const ext = getFileExtension(fileName);
    
    const isImage = CONSTANTS.IMAGE_EXTENSIONS.includes(ext);
    const isVideo = CONSTANTS.VIDEO_EXTENSIONS.includes(ext);
    
    if (!isImage && !isVideo) {
      throw new Error('Tipo de archivo no soportado para visualización multimedia');
    }
    
    // Si es video, reproducir con VLC
    if (isVideo) {
      return await playVideoWithVlc(filePath);
    }
    
    // Si es imagen, devolver datos para el visor
    if (isImage) {
      return { success: true, type: 'image', filePath, theme, fileName };
    }
    
    throw new Error('Tipo de archivo no reconocido');
  } catch (error) {
    throw new Error(`Error al abrir archivo multimedia: ${error.message}`);
  }
}

export async function playVideoWithVlc(filePath) {
  const vlcPath = findVlcPath();
  
  if (!vlcPath) {
    throw new Error('VLC no está instalado. Por favor instala VLC para reproducir videos.');
  }
  
  // Ejecutar VLC en proceso separado
  const vlcProcess = spawn(vlcPath, [filePath], {
    detached: true,
    stdio: 'ignore'
  });
  
  // Desvincular el proceso para que continúe ejecutándose independientemente
  vlcProcess.unref();
  
  vlcProcess.on('error', (error) => {
    console.error('Error al ejecutar VLC:', error.message);
  });
  
  return { success: true, type: 'video', player: 'vlc' };
}

export function isMediaFile(filePath) {
  const ext = getFileExtension(filePath);
  return CONSTANTS.IMAGE_EXTENSIONS.includes(ext) || CONSTANTS.VIDEO_EXTENSIONS.includes(ext);
}

export function isImageFile(filePath) {
  const ext = getFileExtension(filePath);
  return CONSTANTS.IMAGE_EXTENSIONS.includes(ext);
}

export function isVideoFile(filePath) {
  const ext = getFileExtension(filePath);
  return CONSTANTS.VIDEO_EXTENSIONS.includes(ext);
}