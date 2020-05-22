import { app, BrowserWindow, ipcMain } from "electron"
import { loadImage } from "./loadImage"
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


ipcMain.on("open-image", async (event, path) => {
  if (typeof path !== "string") return

  const bitmap = await loadImage(path)
  if (bitmap) event.reply("loaded-image", bitmap)
})

app.on("ready", createMainWindow)
