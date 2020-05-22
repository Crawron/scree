import { remote } from "electron"
import { captureFullScreen } from "./captureFullScreen"

remote.globalShortcut.register("PrintScreen", captureFullScreen)
