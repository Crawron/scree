import { BrowserWindow } from "electron"

let win: BrowserWindow | undefined

export async function createCaptureWindow() {
  win = new BrowserWindow({
    show: false,
    webPreferences: { nodeIntegration: true, webSecurity: false },
  })
  win.loadFile(`../assets/capture.html`).catch(console.error)
  win.webContents.openDevTools()
}

export async function sendCaptureEvent() {
  win?.webContents.send("captureFullScreen")
}
