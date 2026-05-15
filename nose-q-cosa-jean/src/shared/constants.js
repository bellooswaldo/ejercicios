export const CONSTANTS = {
  // Límites de archivos
  MAX_FILE_SIZE_BYTES: 1024 * 1024, // 1 MB
  
  // Extensiones de imagen soportadas
  IMAGE_EXTENSIONS: ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.bmp', '.svg'],
  
  // Extensiones de video soportadas
  VIDEO_EXTENSIONS: ['.mp4', '.webm', '.ogg', '.mkv', '.avi', '.mov'],
  
  // Rutas de VLC para Windows
  VLC_PATHS_WINDOWS: [
    'C:\\Program Files\\VideoLAN\\VLC\\vlc.exe',
    'C:\\Program Files (x86)\\VideoLAN\\VLC\\vlc.exe'
  ],
  
  // Ruta de VLC para macOS
  VLC_PATH_MAC: '/Applications/VLC.app/Contents/MacOS/VLC',
  
  // Dimensiones de ventanas
  DEFAULT_WINDOW_WIDTH: 800,
  DEFAULT_WINDOW_HEIGHT: 600,
  
  IMAGE_VIEWER_WIDTH: 900,
  IMAGE_VIEWER_HEIGHT: 700,
  
  ERROR_DIALOG_WIDTH: 500,
  ERROR_DIALOG_HEIGHT: 200
};