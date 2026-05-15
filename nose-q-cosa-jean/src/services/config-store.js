import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import path from 'node:path';
import { app } from 'electron';

let configPath = null;
let configCache = {};

function getConfigPath() {
  if (configPath === null) {
    const userDataPath = app.getPath('userData');
    configPath = path.join(userDataPath, 'app-config.json');
  }
  return configPath;
}

export function loadConfig() {
  try {
    const configFile = getConfigPath();
    if (existsSync(configFile)) {
      const data = readFileSync(configFile, 'utf-8');
      configCache = JSON.parse(data);
    } else {
      configCache = {
        theme: 'theme-light',
        accentColor: '#007bff'
      };
    }
    // Forzar siempre el color #007bff al iniciar
    configCache.accentColor = '#007bff';
    return configCache;
  } catch (error) {
    console.error('Error loading config:', error);
    configCache = {
      theme: 'theme-light',
      accentColor: '#007bff'
    };
    return configCache;
  }
}

export function saveConfig(config) {
  try {
    // Evitar guardar el color de acento
    const configToSave = { ...configCache, ...config };
    // Remover accentColor si existe para que no se persista
    if (configToSave.accentColor) {
      delete configToSave.accentColor;
    }
    configCache = { ...configToSave, accentColor: '#007bff' };
    const configFile = getConfigPath();
    writeFileSync(configFile, JSON.stringify(configCache, null, 2), 'utf-8');
    return true;
  } catch (error) {
    console.error('Error saving config:', error);
    return false;
  }
}

export function getConfig(key) {
  if (Object.keys(configCache).length === 0) {
    loadConfig();
  }
  return configCache[key];
}

export function setConfig(key, value) {
  // Si se intenta guardar accentColor, ignorar
  if (key === 'accentColor') {
    configCache.accentColor = '#007bff';
    return true;
  }
  configCache[key] = value;
  return saveConfig({ [key]: value });
}

export function getTheme() {
  return getConfig('theme') || 'theme-light';
}

export function getAccentColor() {
  // Siempre retornar #007bff
  return '#007bff';
}

export function setTheme(theme) {
  return setConfig('theme', theme);
}

export function setAccentColor(color) {
  // No guardar el color, solo actualizar en memoria pero no persistir
  configCache.accentColor = '#007bff';
  return true;
}