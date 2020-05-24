import * as datefns from "date-fns"
import { desktopCapturer, remote, Size } from "electron"
import { join } from "path"
import sharp from "sharp"
import { getErrorMessage } from "./getErrorMessage"

function createCombinedScreenshot(
  totalWidth: number,
  maxHeight: number,
  sources: Electron.DesktopCapturerSource[],
) {
  let fullImage = sharp({
    create: {
      width: totalWidth,
      height: maxHeight,
      background: "transparent",
      channels: 4,
    },
  })

  let left = 0

  for (const { thumbnail } of sources) {
    fullImage = fullImage.composite([
      { input: thumbnail.toPNG(), top: 0, left },
    ])
    left += thumbnail.getSize().width
  }

  return fullImage
}

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

    const sizes = sources.map((s) => s.thumbnail.getSize())

    const totalWidth = sizes.reduce((width, size) => width + size.width, 0)
    const maxHeight = Math.max(...sizes.map((s) => s.height))

    const fullImage = createCombinedScreenshot(totalWidth, maxHeight, sources)

    const outputBasename = datefns.format(new Date(), "yyyy-MM-dd-HH-mm-ss")

    const outputPath = join(
      remote.app.getPath("pictures"),
      "Screenshots",
      `${outputBasename}.png`,
    )

    await fullImage.toFile(outputPath)
  } catch (error) {
    remote.dialog.showErrorBox(
      "Could not capture screenshot",
      getErrorMessage(error),
    )
  }
}
