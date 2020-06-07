import { captureFullScreenEvent } from "../../common/ipcEvents"
import { captureFullScreen } from "./captureFullScreen"

captureFullScreenEvent.renderer.listen(captureFullScreen)
