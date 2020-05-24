import { app, dialog } from "electron"
import { getErrorMessage } from "../common/getErrorMessage"
import { ipc } from "../common/ipc"
import { createCaptureWindow } from "./capture/captureWindow"
import { createEditorWindow, getEditorWindow } from "./editor/editorWindow"
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

ipc.main.on.loadImage(async () => {
  try {
    const result = await loadImageFromFileDialog()
    if (result) {
      // would ideally be able to get the window from the event,
      // but this works for now I guess???
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      ipc.main.send.loadImageDone(getEditorWindow()!, result)
    }
  } catch (error) {
    dialog.showErrorBox(
      "An error occurred while loading image",
      getErrorMessage(error),
    )
  }
})
