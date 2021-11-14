import { SupportedFormat } from "./SupportedFormat"
import { Vector2 } from "../renderer/canvasRenderer/types"

export type ImageMetadata = {
  size: Vector2
  format: SupportedFormat
}

export type ImageBufferData = {
  metadata: ImageMetadata
  buffer: Buffer
  dataUrl: string
}

export function createImageData(
  metadata: ImageMetadata,
  buffer: Buffer,
): ImageBufferData {
  const bufferString = buffer.toString("base64")
  const dataUrl = `data:image/${metadata.format};base64,${bufferString}`
  return {
    metadata,
    buffer,
    dataUrl,
  }
}
