import { dialog } from "electron"
import { promises as fs } from "fs"
import { ImageBuffer } from "../../common/ImageBuffer"
import { supportedFormats } from "../../common/SupportedFormat"
import { getImageMetadata } from "../getImageMetadata"

export async function loadImageFromFileDialog(): Promise<
  ImageBuffer | undefined
> {
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
  return new ImageBuffer(await getImageMetadata(fileData), fileData)
}
