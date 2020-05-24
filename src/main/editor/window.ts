import { BrowserWindow } from "electron"
import { isDev } from "../constants"
import { reloadOnChanges } from "../reloadOnChanges"

let editorWindow: BrowserWindow | undefined

export function createEditorWindow() {
  const win = (editorWindow = new BrowserWindow({
    height: 600,
    width: 800,
    webPreferences: { nodeIntegration: true, webSecurity: false },
    show: false,
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

export function showEditorWindow() {
  editorWindow?.show()
}
