import { readFileSync } from "fs"
import Electron, { dialog } from "electron"

import Sharp from "sharp"

export async function loadImage(event: Electron.IpcMainEvent) {
  const dialogResult = dialog.showOpenDialogSync({
    properties: ["openFile"],
  })

  if (!dialogResult) return

  const data = readFileSync(dialogResult[0])
  const { width, height, format } = await Sharp(data).metadata()

  event.reply("loadImageDone", {
    dataUrl: `data:image/${format};base64,${data.toString("base64")}`,
    dimensions: [width, height],
  })
}
