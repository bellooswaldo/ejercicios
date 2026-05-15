const errorTitleElement = document.getElementById('error-title');
const errorDetailElement = document.getElementById('error-detail');

window.electronAPI.onErrorData((event, data) => {
  // Aplicar tema al body
  document.body.className = data.theme || 'theme-light';
  
  // Mostrar el título y mensaje de error
  errorTitleElement.textContent = data.title || 'Error';
  errorDetailElement.textContent = data.message || 'Ha ocurrido un error inesperado';
});

// Limpiar listener cuando se cierra la ventana
window.addEventListener('beforeunload', () => {
  if (window.electronAPI.removeErrorDataListener) {
    window.electronAPI.removeErrorDataListener();
  }
});