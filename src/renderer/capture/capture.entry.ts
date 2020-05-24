import { ipcRenderer } from "electron"
import { captureFullScreen } from "./captureFullScreen"

ipcRenderer.on("captureFullScreen", () => {
  captureFullScreen()
})
