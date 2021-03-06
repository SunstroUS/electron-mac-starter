import { app, BrowserWindow } from 'electron'
import { format as formatUrl } from 'url'
import * as path from 'path'

const isDevelopment = process.env.NODE_ENV !== 'production'
let mainWindow: BrowserWindow | null

const createMainWindow = () => {
  const window = new BrowserWindow({
    backgroundColor: '#66000000',
    webPreferences: { nodeIntegration: true },
    width: 1200,
    height: 800,
    vibrancy: 'appearance-based',
    titleBarStyle: 'hidden',
    trafficLightPosition: { x: 19, y: 37 },
  })

  if (isDevelopment) {
    window.loadURL(`http://localhost:${process.env.ELECTRON_WEBPACK_WDS_PORT}`)
  } else {
    window.loadURL(
      formatUrl({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file',
        slashes: true,
      })
    )
  }

  if (isDevelopment) {
    window.webContents.openDevTools()
  }

  window.on('close', () => {
    app.quit()
  })

  return window
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    mainWindow = createMainWindow()
  }
})

app.on('ready', () => {
  mainWindow = createMainWindow()
})
