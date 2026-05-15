// src/windows/file-explorer/theme-manager.js

let currentTheme = 'theme-light';
let currentAccentColor = '#007bff';
let dynamicStyleElement = null;

export async function initTheme() {
  try {
    currentTheme = await window.api.getTheme();
    currentAccentColor = await window.api.getAccentColor();
    
    document.body.className = currentTheme;
    createOrUpdateDynamicStyle();
    applyAccentColorToCSS(currentAccentColor);
    
    return { theme: currentTheme, accentColor: currentAccentColor };
  } catch (error) {
    console.error('Error al inicializar tema:', error);
    document.body.className = 'theme-light';
    createOrUpdateDynamicStyle();
    return { theme: 'theme-light', accentColor: '#007bff' };
  }
}

export async function toggleTheme() {
  const newTheme = currentTheme === 'theme-light' ? 'theme-dark' : 'theme-light';
  document.body.className = newTheme;
  currentTheme = newTheme;
  
  try {
    await window.api.setTheme(newTheme);
  } catch (error) {
    console.error('Error al guardar tema:', error);
  }
  
  return newTheme;
}

export async function setAccentColor(color) {
  currentAccentColor = color;
  applyAccentColorToCSS(color);
  
  try {
    await window.api.setAccentColor(color);
  } catch (error) {
    console.error('Error al guardar color de acento:', error);
  }
  
  return color;
}

export function getCurrentTheme() {
  return currentTheme;
}

export function getCurrentAccentColor() {
  return currentAccentColor;
}

export function getThemeIcon(theme) {
  return theme === 'theme-dark' ? '🌙' : '☀️';
}

export function getThemeLabel(theme) {
  return theme === 'theme-dark' ? 'Tema claro' : 'Tema oscuro';
}

function createOrUpdateDynamicStyle() {
  if (!dynamicStyleElement) {
    dynamicStyleElement = document.createElement('style');
    dynamicStyleElement.id = 'dynamic-accent-style';
    document.head.appendChild(dynamicStyleElement);
  }
}

function applyAccentColorToCSS(color) {
  createOrUpdateDynamicStyle();
  
  const darker = adjustColorSimple(color, -30);
  
  dynamicStyleElement.textContent = `
    body.theme-light {
      --accent-color: ${color};
      --accent-hover: ${darker};
      --folder-color: ${color};
      --button-bg: ${color};
      --button-hover-bg: ${darker};
    }
    body.theme-dark {
      --accent-color: ${color};
      --accent-hover: ${darker};
      --folder-color: ${color};
      --button-bg: ${color};
      --button-text: #1a1a1a;
      --button-hover-bg: ${darker};
    }
  `;
}

function adjustColorSimple(hex, amount) {
  let r = parseInt(hex.substring(1, 3), 16);
  let g = parseInt(hex.substring(3, 5), 16);
  let b = parseInt(hex.substring(5, 7), 16);
  
  r = Math.max(0, Math.min(255, r + amount));
  g = Math.max(0, Math.min(255, g + amount));
  b = Math.max(0, Math.min(255, b + amount));
  
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}