import { app, BrowserWindow } from "electron"

declare const MAIN_WINDOW_WEBPACK_ENTRY: string

if (require("electron-squirrel-startup")) {
  app.quit()
}

function createMainWindow() {
  const mainWindow = new BrowserWindow({
    height: 600,
    width: 800,
    webPreferences: { nodeIntegration: true, webSecurity: false },
  })

  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY)

  if (process.env.NODE_ENV === "production") {
    mainWindow.webContents.openDevTools()
  }
}

app.on("ready", createMainWindow)
