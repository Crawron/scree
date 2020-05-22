import { app, BrowserWindow, dialog } from "electron"
import { getErrorMessage } from "./helpers"

const isDev = process.argv.includes("--dev")

let editorWindow: BrowserWindow | undefined

async function createEditorWindow() {
  const win = (editorWindow = new BrowserWindow({
    height: 600,
    width: 800,
    webPreferences: { nodeIntegration: true, webSecurity: false },
  }))

  try {
    if (isDev) {
      await win.loadURL("http://localhost:3000/editor.html")
    } else {
      await win.loadFile("../assets/editor.html")
    }
  } catch (error) {
    dialog.showErrorBox(
      "Failed to create editor window",
      getErrorMessage(error),
    )
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
