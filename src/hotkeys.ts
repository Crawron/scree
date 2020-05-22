import * as datefns from "date-fns"
import { desktopCapturer, remote, Size } from "electron"
import { promises as fs } from "fs"
import { join } from "path"

async function captureFullScreen() {
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

    const outputFolder = join(remote.app.getPath("pictures"), "Screenshots")
    await fs.mkdir(outputFolder, { recursive: true })

    await Promise.all(
      sources.map(async (source) => {
        const basename = datefns.format(new Date(), "yyyy-MM-dd-HH-mm-ss")
        const filename = `${basename}.png`
        const outputPath = join(outputFolder, filename)
        await fs.writeFile(outputPath, source.thumbnail.toPNG())
      }),
    )
  } catch (error) {
    remote.dialog.showErrorBox(
      "Could not capture screenshot",
      error instanceof Error ? error.message : String(error),
    )
  }
}

remote.globalShortcut.register("PrintScreen", captureFullScreen)
