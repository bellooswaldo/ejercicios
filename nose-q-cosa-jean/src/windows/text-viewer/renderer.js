const fileNameElement = document.getElementById('file-name');
const contentElement = document.getElementById('content');

window.electronAPI.onViewerData((event, data) => {
  fileNameElement.textContent = data.fileName;
  contentElement.value = data.content;
  document.body.className = data.theme;
});