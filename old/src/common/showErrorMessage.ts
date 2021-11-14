import { dialog } from "electron"
import { getErrorMessage } from "./getErrorMessage"

export function showErrorMessage(error: unknown) {
  dialog.showErrorBox("oops lol", getErrorMessage(error))
}
