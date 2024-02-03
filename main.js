const { app, BrowserWindow } = require("electron");
const path = require("path")

const isDev = process.env.NODE_ENV !== 'production'
const isMac = process.platform === 'darwin';

function createMainWindow() {
    const mainWindow = new BrowserWindow({
        title: "Image Resizer",
        width: isDev ? 1000 : 500,
        height: 600
    });

    // Open devtols if in dev env
    if(isDev) {
        mainWindow.webContents.openDevTools()
    }

    mainWindow.loadFile(path.join(__dirname, "./renderer/index.html"));
};

app.whenReady().then(() => {
    createMainWindow();


  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createMainWindow()
    }
  })
});

app.on('window-all-closed', () => {
    if (!isMac) {
      app.quit()
    }
  })