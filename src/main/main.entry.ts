import { app, ipcMain } from "electron"
import { createCaptureWindow } from "./capture/captureWindow"
import { createEditorWindow } from "./editor/editorWindow"
import { loadImageFromFileDialog } from "./editor/loadImageFromFileDialog"
import { registerHotkeys } from "./hotkeys"

app.on("ready", () => {
  createEditorWindow()
  createCaptureWindow()
  registerHotkeys()

  // show at startup for debugging
  // later this would be triggered by something else, probably post capture
  // showEditorWindow()
})

ipcMain.on("loadImage", loadImageFromFileDialog)
