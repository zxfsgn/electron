const { app, BrowserWindow } = require('electron')
const url = require('url')
const path = require('path')

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 800,
    minHeight: 400,
    minWidth: 400,
    webPreferences: {
      nodeIntegration: true
    }
  })

  win.setMenu(null)

  const startUrl = process.env.ELECTRON_START_URL || url.format({
    pathname: path.join(__dirname, '../index.html'),
    protocol: 'file:',
    slashes: true
  });
  win.loadURL(startUrl);

  //win.webContents.openDevTools()
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
