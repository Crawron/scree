import * as datefns from "date-fns"
import { desktopCapturer, remote, Size } from "electron"
import { join } from "path"
import sharp from "sharp"
import { getErrorMessage } from "../../common/getErrorMessage"
import { createBufferFromCanvas } from "../createBufferFromCanvas"
import { loadImage } from "../loadImage"

export async function captureFullScreen() {
  try {
    const area = (size: Size) => size.width * size.height

    const thumbnailSize = remote.screen
      .getAllDisplays()
      .reduce((largest, display) =>
        area(display.size) > area(largest.size) ? display : largest,
      ).size

    const sources = await desktopCapturer.getSources({
      types: ["screen"],
      thumbnailSize,
    })

    const fullImage = await createCombinedScreenshot(sources)

    const outputBasename = datefns.format(new Date(), "yyyy-MM-dd-HH-mm-ss")

    const outputPath = join(
      remote.app.getPath("pictures"),
      "Screenshots",
      `${outputBasename}.png`,
    )

    // do we even need sharp here lol
    await sharp(fullImage).toFile(outputPath)
  } catch (error) {
    remote.dialog.showErrorBox(
      "Could not capture screenshot",
      getErrorMessage(error),
    )
  }
}

async function createCombinedScreenshot(
  sources: Electron.DesktopCapturerSource[],
) {
  const sizes = sources.map((s) => s.thumbnail.getSize())

  const totalWidth = sizes.reduce((width, size) => width + size.width, 0)
  const maxHeight = Math.max(...sizes.map((s) => s.height))

  const canvas = document.createElement("canvas")
  canvas.width = totalWidth
  canvas.height = maxHeight

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const context = canvas.getContext("2d")!
  let left = 0

  for (const { thumbnail } of sources) {
    const image = await loadImage(thumbnail.toDataURL())
    context.drawImage(image, left, 0)
    left += thumbnail.getSize().width
  }

  return createBufferFromCanvas(canvas)
}
