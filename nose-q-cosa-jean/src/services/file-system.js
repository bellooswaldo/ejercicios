import fs from 'node:fs';
import fsPromises from 'node:fs/promises';
import path from 'node:path';
import { CONSTANTS } from '../shared/constants.js';

export function readDirectory(dirPath) {
  try {
    const files = fs.readdirSync(dirPath, { withFileTypes: true });
    return files.map(file => ({
      name: file.name,
      isDirectory: file.isDirectory(),
      path: path.join(dirPath, file.name)
    }));
  } catch (error) {
    throw new Error(`No se pudo leer el directorio: ${error.message}`);
  }
}

export async function readFileContent(filePath) {
  try {
    const stats = await fsPromises.stat(filePath);
    
    if (stats.size > CONSTANTS.MAX_FILE_SIZE_BYTES) {
      const sizeMB = (stats.size / (1024 * 1024)).toFixed(2);
      throw new Error(`El archivo es demasiado grande (${sizeMB} MB). Máximo permitido: 1 MB`);
    }
    
    const content = await fsPromises.readFile(filePath, 'utf-8');
    return { content, size: stats.size };
  } catch (error) {
    if (error.code === 'EACCES') {
      throw new Error('No tienes permisos para leer este archivo');
    }
    if (error.code === 'ENOENT') {
      throw new Error('El archivo no existe');
    }
    if (error.message.includes('UTF-8') || error.message.includes('encoding')) {
      throw new Error('No se puede mostrar el contenido: Archivo binario o con codificación no soportada');
    }
    throw new Error(`Error al leer el archivo: ${error.message}`);
  }
}

export function fileExists(filePath) {
  return fs.existsSync(filePath);
}

export function getFileStats(filePath) {
  try {
    return fs.statSync(filePath);
  } catch (error) {
    return null;
  }
}