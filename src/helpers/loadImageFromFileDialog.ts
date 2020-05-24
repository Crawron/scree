import Electron, { dialog } from "electron"
import { readFileSync } from "fs"
import Sharp from "sharp"

export async function loadImageFromFileDialog(event: Electron.IpcMainEvent) {
  const dialogResult = dialog.showOpenDialogSync({
    properties: ["openFile"],
    filters: [
      {
        name: "Image",
        extensions: ["png", "tiff", "jpeg", "jpg", "webp", "gif", "svg"],
      },
    ],
  })

  if (!dialogResult) return

  const data = readFileSync(dialogResult[0])
  const { width, height, format } = await Sharp(data).metadata()

  event.reply("loadImageDone", {
    dataUrl: `data:image/${format};base64,${data.toString("base64")}`,
    dimensions: [width, height],
  })
}
