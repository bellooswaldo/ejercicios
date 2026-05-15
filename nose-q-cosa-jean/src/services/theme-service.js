import { getTheme, getAccentColor, setTheme, setAccentColor } from './config-store.js';
import { adjustColor } from '../shared/utils.js';

let currentTheme = null;
let currentAccentColor = null;
let styleElement = null;

export function initThemeService() {
  currentTheme = getTheme();
  currentAccentColor = getAccentColor();
  
  if (!styleElement) {
    styleElement = document.createElement('style');
    styleElement.id = 'dynamic-accent-style';
    document.head.appendChild(styleElement);
  }
  
  updateDynamicStyles();
}

export function getCurrentTheme() {
  if (currentTheme === null) {
    currentTheme = getTheme();
  }
  return currentTheme;
}

export function getCurrentAccentColor() {
  if (currentAccentColor === null) {
    currentAccentColor = getAccentColor();
  }
  return currentAccentColor;
}

export function applyTheme(theme) {
  currentTheme = theme;
  document.body.className = theme;
  setTheme(theme);
  updateDynamicStyles();
  return theme;
}

export function applyAccentColor(color) {
  currentAccentColor = color;
  setAccentColor(color);
  updateDynamicStyles();
  return color;
}

export function updateDynamicStyles() {
  if (!styleElement) return;
  
  const color = currentAccentColor || '#007bff';
  const darkenColor = adjustColor(color, -30);
  
  styleElement.textContent = `
    body.theme-light {
      --accent-color: ${color};
      --accent-hover: ${darkenColor};
      --folder-color: ${color};
      --button-bg: ${color};
      --button-hover-bg: ${darkenColor};
    }
    body.theme-dark {
      --accent-color: ${color};
      --accent-hover: ${darkenColor};
      --folder-color: ${color};
      --button-bg: ${color};
      --button-text: #1a1a1a;
      --button-hover-bg: ${darkenColor};
    }
  `;
}

export function toggleTheme() {
  const newTheme = currentTheme === 'theme-light' ? 'theme-dark' : 'theme-light';
  return applyTheme(newTheme);
}

export function getThemeIcon(theme) {
  return theme === 'theme-dark' ? '&#9789;' : '&#9788;';
}

export function getThemeLabel(theme) {
  return theme === 'theme-dark' ? 'Tema claro' : 'Tema oscuro';
}