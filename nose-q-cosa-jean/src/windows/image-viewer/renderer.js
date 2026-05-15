const imageElement = document.getElementById('image');
const loadingElement = document.getElementById('loading');
const imageInfoElement = document.getElementById('image-info');

window.electronAPI.onImageData((event, data) => {
  // Aplicar tema
  document.body.className = data.theme;
  
  // Construir URL del archivo
  const fileUrl = `file://${data.filePath.replace(/\\/g, '/')}`;
  
  // Mostrar información de la imagen
  if (imageInfoElement) {
    imageInfoElement.textContent = data.fileName;
  }
  
  // Crear nueva imagen para pre-cargar
  const img = new Image();
  
  img.onload = () => {
    imageElement.src = fileUrl;
    imageElement.alt = data.fileName;
    imageElement.style.display = 'block';
    if (loadingElement) {
      loadingElement.style.display = 'none';
    }
  };
  
  img.onerror = () => {
    if (loadingElement) {
      loadingElement.textContent = 'Error: No se pudo cargar la imagen';
      loadingElement.style.color = '#ff6666';
    }
    console.error('Error al cargar la imagen:', fileUrl);
  };
  
  img.src = fileUrl;
});

// Limpiar listener cuando se cierra la ventana
window.addEventListener('beforeunload', () => {
  if (window.electronAPI.removeImageDataListener) {
    window.electronAPI.removeImageDataListener();
  }
});