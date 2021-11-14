import { Menu, MenuItemConstructorOptions, screen, Tray } from "electron"
import { join } from "node:path"
import pkg from "../package.json"
import { captureDisplay } from "./capture"
import { assetsFolderPath } from "./constants"

const trayIconPath = join(assetsFolderPath, "tray.png")

let tray: Tray | undefined

export function createTray() {
  tray = new Tray(trayIconPath)
  tray.setToolTip(pkg.name)
  tray.setContextMenu(
    Menu.buildFromTemplate([
      { label: `${pkg.name} v${pkg.version}`, enabled: false },
      { type: "separator" },
      ...getDisplayCaptureMenuOptions(),
      { type: "separator" },
      { role: "quit" },
    ]),
  )

  // @ts-expect-error: need to keep the tray in memory
  globalThis.tray = tray
}

function getDisplayCaptureMenuOptions(): MenuItemConstructorOptions[] {
  const displays = screen.getAllDisplays()

  const displayOptions: MenuItemConstructorOptions[] = displays.map(
    ({ size, bounds }, index) => ({
      label: `Screenshot Display ${index + 1} (${size.width}x${size.height})`,
      click: () => captureDisplay(bounds),
    }),
  )

  const allDisplaysOption: MenuItemConstructorOptions = {
    label: "Screenshot All Displays",
    click: () => captureDisplay(),
  }

  return [...displayOptions, allDisplaysOption]
}
