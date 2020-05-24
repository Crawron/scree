import Electron, { dialog } from "electron"
import { promises as fs } from "fs"
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

  const data = await fs.readFile(dialogResult[0])
  const { width, height, format } = await Sharp(data).metadata()

  event.reply("loadImageDone", {
    url: `data:image/${format};base64,${data.toString("base64")}`,
    dimensions: [width, height],
  })
}
