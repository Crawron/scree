import { remote } from "electron"
import { captureFullScreen } from "./renderer/captureFullScreen"

remote.globalShortcut.register("PrintScreen", captureFullScreen)
