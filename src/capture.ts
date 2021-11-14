import { app, dialog, Rectangle, shell } from "electron"
import { createWriteStream } from "node:fs"
import { mkdir } from "node:fs/promises"
import { join } from "node:path"
import { pipeline } from "node:stream/promises"
import sharp from "sharp"
import { ffmpeg } from "./ffmpeg"
import { toError } from "./helpers"

export async function captureDisplay(displayArea?: Rectangle) {
  try {
    // run ffmpeg as soon as possible
    const child = ffmpeg([
      "-f gdigrab",
      "-loglevel quiet",
      "-framerate 1",
      "-i desktop",
      "-frames:v 1",
      "-f image2",
      "-",
    ])

    if (!child.stdout) {
      throw new Error("cannot read ffmpeg output")
    }

    // output paths
    const screenshotsFolder = join(app.getPath("pictures"), "Screenshots")
    const timestamp = createFileTimestamp()
    const outputPath = join(screenshotsFolder, `screenshot-${timestamp}.png`)

    // ensure screenshots folder exists
    await mkdir(screenshotsFolder, { recursive: true })

    // prepare sharp instance
    const sharpInstance = sharp()
    if (displayArea) {
      const { x, y, width, height } = displayArea
      sharpInstance.extract({ left: x, top: y, width, height })
    }

    // p i p e
    await pipeline([
      child.stdout,
      sharpInstance.png(),
      createWriteStream(outputPath),
    ])

    shell.showItemInFolder(outputPath)
  } catch (error) {
    const { stack, message } = toError(error)
    dialog.showErrorBox("Failed to capture screenshot", stack || message)
  }
}

function createFileTimestamp() {
  return [
    new Date().getFullYear(),
    new Date().getMonth() + 1,
    new Date().getDate(),
    new Date().getHours(),
    new Date().getMinutes(),
    new Date().getSeconds(),
  ].join("-")
}
