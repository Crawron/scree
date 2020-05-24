import { app, ipcMain } from "electron"
import { loadImageFromFileDialog } from "./editor/loadImageFromFileDialog"
import { createEditorWindow, showEditorWindow } from "./editor/window"

app.on("ready", () => {
  createEditorWindow()

  // show at startup for debugging
  // later this would be triggered by something else, probably post capture
  showEditorWindow()
})

ipcMain.on("loadImage", loadImageFromFileDialog)
