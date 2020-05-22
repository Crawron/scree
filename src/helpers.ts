import { BrowserWindow } from "electron"
import { watch } from "fs"
import { join } from "path"

export function getErrorMessage(error: any): string {
  return error instanceof Error ? error.message : String(error)
}

export function reloadOnChanges(win: BrowserWindow) {
  watch(__dirname, { recursive: true }, () => win.reload())
  watch(join(__dirname, "../assets"), { recursive: true }, () => win.reload())
}
