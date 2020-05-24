import { dialog } from "electron"
import { promises as fs } from "fs"
import Sharp from "sharp"

export type LoadImageResult = {
  url: string
  dimensions: [number, number]
}

export async function loadImageFromFileDialog(): Promise<
  LoadImageResult | undefined
> {
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

  return {
    url: `data:image/${format};base64,${data.toString("base64")}`,
    dimensions: [width ?? 0, height ?? 0],
  }
}
