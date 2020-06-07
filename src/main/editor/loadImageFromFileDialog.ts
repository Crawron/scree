import Electron, { dialog } from "electron"
import { promises as fs } from "fs"
import { ImageBuffer } from "../../common/ImageBuffer"
import { getImageMetadata } from "../getImageMetadata"
import { supportedFormats } from "../../common/SupportedFormat"

export async function loadImageFromFileDialog(event: Electron.IpcMainEvent) {
  const dialogResult = dialog.showOpenDialogSync({
    properties: ["openFile"],
    filters: [
      {
        name: "Image",
        extensions: [...supportedFormats],
      },
    ],
  })

  if (!dialogResult) return

  const fileData = await fs.readFile(dialogResult[0])
  const imageBuffer = new ImageBuffer(
    await getImageMetadata(fileData),
    fileData,
  )

  event.reply("loadImageDone", imageBuffer)
}
