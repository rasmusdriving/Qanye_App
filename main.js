const { app, BrowserWindow, globalShortcut, screen } = require('electron');
const path = require('path');
const { autoUpdater } = require('electron-updater');

function createWindow() {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;

  const mainWindow = new BrowserWindow({
    width: width * 0.5,
    height: height * 0.5,
    frame: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  mainWindow.loadFile('index.html');

  // Set the window to be always on top
  mainWindow.setAlwaysOnTop(true);

  return mainWindow;
}

app.whenReady().then(() => {
  const mainWindow = createWindow();

  // Check for updates and notify the user if an update is available
  autoUpdater.checkForUpdatesAndNotify();

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });

  globalShortcut.register('CommandOrControl+K', () => {
    if (mainWindow.isVisible()) {
      mainWindow.hide();
    } else {
      mainWindow.show();
      // Ensure the window is always on top when shown
      mainWindow.setAlwaysOnTop(true);
    }
  });
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});

app.on('will-quit', () => {
  globalShortcut.unregisterAll();
});
