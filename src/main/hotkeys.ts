import { globalShortcut } from "electron"
import { sendCaptureEvent } from "./capture/window"

export function registerHotkeys() {
  globalShortcut.register("PrintScreen", () => {
    sendCaptureEvent()
  })
}
