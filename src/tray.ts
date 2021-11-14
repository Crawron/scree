import { Menu, Tray } from "electron"
import { join } from "node:path"
import { assetsFolderPath } from "./constants"

const trayIconPath = join(assetsFolderPath, "tray.png")

let tray: Tray | null = null

export function createTray() {
  tray = new Tray(trayIconPath)
  tray.setToolTip("scree")
  tray.setContextMenu(Menu.buildFromTemplate([{ role: "quit" }]))
}
