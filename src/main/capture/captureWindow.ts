import { BrowserWindow } from "electron"
import { isDev } from "../constants"
import { reloadOnChanges } from "../reloadOnChanges"

let win: BrowserWindow | undefined

export async function createCaptureWindow() {
  win = new BrowserWindow({
    show: false,
    webPreferences: { nodeIntegration: true, webSecurity: false },
  })
  win.loadFile(`../assets/capture.html`).catch(console.error)

  if (isDev) {
    // win.webContents.openDevTools()
    reloadOnChanges(win)
  }
}

export async function sendCaptureEvent() {
  win?.webContents.send("captureFullScreen")
}
