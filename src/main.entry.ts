import { app, BrowserWindow, ipcMain } from "electron"
import { reloadOnChanges } from "./helpers/reloadOnChanges"
import { loadImage } from "./helpers/loadImage"

const isDev = process.argv.includes("--dev")

let editorWindow: BrowserWindow | undefined

function createEditorWindow() {
  const win = (editorWindow = new BrowserWindow({
    height: 600,
    width: 800,
    webPreferences: { nodeIntegration: true, webSecurity: false },
  }))

  win.loadFile("../assets/editor.html")

  win.on("close", (event) => {
    event.preventDefault()
    win.hide()
  })

  if (isDev) {
    win.webContents.openDevTools()
    reloadOnChanges(win)
  }
}

function showEditorWindow() {
  editorWindow?.show()
}

app.on("ready", () => {
  createEditorWindow()

  // show at startup for debugging
  // later this would be triggered by something else, probably post capture
  showEditorWindow()
})

ipcMain.on("loadImage", loadImage)
