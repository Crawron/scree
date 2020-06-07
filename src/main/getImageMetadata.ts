import Sharp from "sharp"

import { ImageMetadata } from "../common/ImageBuffer"
import { isSupportedFormat } from "../common/SupportedFormat"
import { vec2 } from "../renderer/canvasRenderer/types"

export async function getImageMetadata(buffer: Buffer): Promise<ImageMetadata> {
  const { width, height, format } = await Sharp(buffer).metadata()

  if (!format) throw new Error("Image failed to load")
  if (!isSupportedFormat(format))
    throw new Error(`Image format not supported: ${format}`)

  return {
    format,
    size: vec2(width, height),
  }
}
