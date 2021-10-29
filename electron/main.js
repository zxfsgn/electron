const { app, BrowserWindow, ipcMain } = require('electron')
const url = require('url')
const path = require('path')
const http = require("http");

function doRequest(options) {
  return new Promise((resolve, reject) => {
    const req = http.get(options, (res) => {
      res.setEncoding("utf8")
      let body = ""
      res.on("data", chunk => {
        body += chunk;
      });
      res.on("end", () => {
        resolve(JSON.parse(body))
      })
    })
    req.on('error', (err) => {
      reject(err)
    });
  })
}

const fetching = (channel) => {
  ipcMain.handle(channel, async (event, url) => {
    const res = await doRequest(url)
    return res
  })
}

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js")
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

fetching('getCountries')
fetching('getRate')
fetching('getSymbols')