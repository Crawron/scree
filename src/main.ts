import { app, dialog } from "electron"
import { toError } from "./helpers"
import { createTray } from "./tray"

void (async () => {
  try {
    await app.whenReady()
    createTray()
  } catch (error) {
    const { stack, message } = toError(error)
    dialog.showErrorBox("oops lol", stack || message)
  }
})()
