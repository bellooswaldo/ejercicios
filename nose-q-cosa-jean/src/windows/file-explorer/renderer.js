import { initTheme, toggleTheme, setAccentColor, getCurrentTheme, getThemeIcon, getThemeLabel } from './theme-manager.js';

const listElement = document.getElementById("file-list");
const pathElement = document.getElementById("current-path");
const searchInput = document.getElementById("search-input");
const clearSearchBtn = document.getElementById("clear-search-btn");
const menuBtn = document.getElementById("menu-btn");
const dropdownMenu = document.getElementById("dropdown-menu");
const themeOption = document.getElementById("theme-option");
const themeIcon = document.getElementById("theme-icon");
const themeLabel = document.getElementById("theme-label");
const colorPicker = document.getElementById("color-picker");
const applyColorBtn = document.getElementById("apply-color-btn");

let currentPath = "";
let allFiles = [];

// Inicializar tema
initTheme().then(({ theme, accentColor }) => {
  themeIcon.innerHTML = getThemeIcon(theme);
  themeLabel.textContent = getThemeLabel(theme);
  colorPicker.value = accentColor;
});

function filterFiles() {
  const searchTerm = searchInput.value.toLowerCase().trim();
  const items = listElement.children;

  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const text = item.innerText.toLowerCase();

    if (text === '.. (volver)' || text === '.. (back)') {
      item.style.display = '';
      continue;
    }

    if (searchTerm === '') {
      item.style.display = '';
    } else if (text.includes(searchTerm)) {
      item.style.display = '';
    } else {
      item.style.display = 'none';
    }
  }
}

function clearSearch() {
  searchInput.value = '';
  filterFiles();
}

searchInput.addEventListener('keyup', () => {
  filterFiles();
});

clearSearchBtn.addEventListener('click', () => {
  clearSearch();
});

menuBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  dropdownMenu.classList.toggle('show');
});

document.addEventListener('click', (e) => {
  if (!menuBtn.contains(e.target) && !dropdownMenu.contains(e.target)) {
    dropdownMenu.classList.remove('show');
  }
});

themeOption.addEventListener('click', async () => {
  const newTheme = await toggleTheme();
  themeIcon.innerHTML = getThemeIcon(newTheme);
  themeLabel.textContent = getThemeLabel(newTheme);
  dropdownMenu.classList.remove('show');
});

colorPicker.addEventListener('click', (e) => {
  e.stopPropagation();
});

colorPicker.addEventListener('input', (e) => {
  e.stopPropagation();
});

applyColorBtn.addEventListener('click', async (e) => {
  e.stopPropagation();
  const color = colorPicker.value;
  await setAccentColor(color);
  dropdownMenu.classList.remove('show');
});

function showErrorDialog(title, message) {
  const currentTheme = getCurrentTheme();
  window.api.showErrorDialog(title, message, currentTheme).catch(err => {
    console.error('Error al mostrar diálogo:', err);
    alert(`${title}: ${message}`);
  });
}

async function loadDir(dirPath) {
  try {
    listElement.innerHTML = '<div class="loading">Cargando archivos...</div>';
    currentPath = dirPath;
    pathElement.innerText = dirPath;
    clearSearch();

    const files = await window.api.readDir(dirPath);
    allFiles = files;

    listElement.innerHTML = '';

    const back = document.createElement('div');
    back.className = 'item folder';
    back.innerText = '.. (Volver)';

    const parentPath = dirPath.substring(0, dirPath.lastIndexOf("/"));
    if (parentPath && parentPath !== '' || dirPath !== '/') {
      back.ondblclick = () => loadDir(parentPath || '/');
    } else {
      back.style.opacity = '0.5';
      back.style.cursor = 'not-allowed';
    }

    listElement.appendChild(back);

    if (files.length === 0) {
      const emptyMsg = document.createElement('div');
      emptyMsg.className = 'empty-folder';
      emptyMsg.innerText = 'Carpeta vacía';
      listElement.appendChild(emptyMsg);
    }

    files.forEach(file => {
      const div = document.createElement('div');
      div.className = `item ${file.isDirectory ? 'folder' : ''}`;
      div.innerText = `${file.isDirectory ? 'fol' : 'fil'} ${file.name}`;

      if (file.isDirectory) {
        div.ondblclick = () => loadDir(file.path);
      } else {
        div.ondblclick = async () => {
          const ext = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
          const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.bmp', '.svg'];
          const videoExtensions = ['.mp4', '.webm', '.ogg', '.mkv', '.avi', '.mov'];

          if (imageExtensions.includes(ext)) {
            try {
              await window.api.openImageViewer(file.path, getCurrentTheme(), file.name);
            } catch (error) {
              showErrorDialog('Error al abrir imagen', error.message);
            }
            return;
          }

          if (videoExtensions.includes(ext)) {
            try {
              await window.api.openMedia(file.path, getCurrentTheme());
            } catch (error) {
              showErrorDialog('Error al reproducir video', error.message);
            }
            return;
          }

          try {
            const result = await window.api.readFile(file.path);
            const content = result.content || result;
            const viewerWindow = window.open('', '_blank', 'width=700,height=500');
            if (viewerWindow) {
              const currentTheme = getCurrentTheme();
              const escapedContent = JSON.stringify(content).replace(/</g, '\\u003c').replace(/>/g, '\\u003e');
              const htmlContent = `
              <!DOCTYPE html>
              <html>
              <head>
                <meta charset="UTF-8">
                <title>${file.name} - Visor de texto</title>
                <style>
                  * { box-sizing: border-box; }
                  body {
                    font-family: monospace;
                    margin: 0;
                    padding: 20px;
                    display: flex;
                    flex-direction: column;
                    height: 100vh;
                  }
                  body.theme-light {
                    background: #f4f4f4;
                    color: #333333;
                  }
                  body.theme-light textarea {
                    background: #ffffff;
                    color: #333333;
                    border: 1px solid #cccccc;
                  }
                  body.theme-light button {
                    background: #007bff;
                    color: #ffffff;
                  }
                  body.theme-light button:hover { background: #0056b3; }
                  body.theme-dark {
                    background: #1e1e1e;
                    color: #e0e0e0;
                  }
                  body.theme-dark textarea {
                    background: #2d2d2d;
                    color: #e0e0e0;
                    border: 1px solid #4a4a4a;
                  }
                  body.theme-dark button {
                    background: #4da6ff;
                    color: #1a1a1a;
                  }
                  body.theme-dark button:hover { background: #3399ff; }
                  h3 {
                    margin: 0 0 10px 0;
                    word-break: break-all;
                  }
                  textarea {
                    flex: 1;
                    font-family: monospace;
                    font-size: 12px;
                    padding: 10px;
                    border-radius: 4px;
                    resize: none;
                    margin-bottom: 10px;
                  }
                  button {
                    padding: 8px 16px;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                    font-size: 14px;
                  }
                </style>
              </head>
              <body class="${currentTheme}">
                <h3>${file.name}</h3>
                <textarea readonly id="content"></textarea>
                <button onclick="window.close()">Cerrar</button>
                <script>
                  document.getElementById('content').value = ${escapedContent};
                <\/script>
              </body>
              </html>
              `;
              viewerWindow.document.write(htmlContent);
              viewerWindow.document.close();
            }
          } catch (error) {
            showErrorDialog('Error al leer el archivo', error.message);
          }
        };
      }
      listElement.appendChild(div);
    });
  } catch (error) {
    listElement.innerHTML = `<div class="error">Error: ${error.message || 'No se pudo acceder al directorio'}</div>`;
    console.error('Error al cargar directorio:', error);
  }
}

async function init() {
  try {
    const homePath = await window.api.getHomePath();
    await loadDir(homePath);
  } catch (error) {
    listElement.innerHTML = `<div class="error">Error al iniciar: ${error.message}</div>`;
  }
}

init();