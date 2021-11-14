import { globalShortcut } from "electron"
import { sendCaptureEvent } from "./capture/captureWindow"

export function registerHotkeys() {
  globalShortcut.register("PrintScreen", () => {
    sendCaptureEvent()
  })
}
