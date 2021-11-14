import { dialog } from "electron"
import { promises as fs } from "fs"
import { createImageData, ImageBufferData } from "../../common/ImageBufferData"
import { supportedFormats } from "../../common/SupportedFormat"
import { getImageMetadata } from "../getImageMetadata"

export async function loadImageFromFileDialog(): Promise<
  ImageBufferData | undefined
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
  return createImageData(await getImageMetadata(fileData), fileData)
}
