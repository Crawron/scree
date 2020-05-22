import { remote } from "electron"
import { captureFullScreen } from "./helpers/captureFullScreen"

remote.globalShortcut.register("PrintScreen", captureFullScreen)
