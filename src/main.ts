import { app, BrowserWindow } from "electron"

const isDev = process.argv.includes("--dev")

let editorWindow: BrowserWindow | undefined

function createEditorWindow() {
  const win = (editorWindow = new BrowserWindow({
    height: 600,
    width: 800,
    webPreferences: { nodeIntegration: true, webSecurity: false },
  }))

  if (isDev) {
    win.loadURL("http://localhost:3000/editor/view.html")
  } else {
    win.loadFile("./editor/view.html")
  }

  if (isDev) {
    win.webContents.openDevTools()
  }

  win.on("close", (event) => {
    event.preventDefault()
    win.hide()
  })
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
