import { existsSync } from 'node:fs';
import { execSync } from 'node:child_process';
import { CONSTANTS } from '../shared/constants.js';

export function findVlcPath() {
  try {
    // Windows
    if (process.platform === 'win32') {
      // Buscar en rutas comunes
      for (const vlcPath of CONSTANTS.VLC_PATHS_WINDOWS) {
        if (existsSync(vlcPath)) {
          return vlcPath;
        }
      }
      
      // Buscar en PATH del sistema
      try {
        const whereResult = execSync('where vlc', { stdio: ['pipe', 'pipe', 'pipe'] }).toString().trim();
        if (whereResult) {
          const firstPath = whereResult.split('\n')[0].trim();
          if (firstPath && existsSync(firstPath)) {
            return firstPath;
          }
        }
      } catch (e) {
        // VLC no encontrado en PATH
      }
    } 
    // macOS
    else if (process.platform === 'darwin') {
      if (existsSync(CONSTANTS.VLC_PATH_MAC)) {
        return CONSTANTS.VLC_PATH_MAC;
      }
      
      try {
        const whichResult = execSync('which vlc', { stdio: ['pipe', 'pipe', 'pipe'] }).toString().trim();
        if (whichResult && existsSync(whichResult)) {
          return whichResult;
        }
      } catch (e) {
        // VLC no encontrado en PATH
      }
    } 
    // Linux
    else {
      try {
        const whichResult = execSync('which vlc', { stdio: ['pipe', 'pipe', 'pipe'] }).toString().trim();
        if (whichResult && existsSync(whichResult)) {
          return whichResult;
        }
      } catch (e) {
        // VLC no encontrado en PATH
      }
    }
    
    return null;
  } catch (error) {
    return null;
  }
}

export function isVlcInstalled() {
  return findVlcPath() !== null;
}