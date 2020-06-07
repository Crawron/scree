import { SupportedFormat } from "./SupportedFormat"
import { Vector2 } from "../renderer/canvasRenderer/types"

export type ImageMetadata = {
  size: Vector2
  format: SupportedFormat
}

export class ImageBuffer {
  constructor(public metadata: ImageMetadata, public buffer: Buffer) {}

  get dataUrl() {
    return `data:image/${this.metadata.format};base64,${this.buffer.toString(
      "base64",
    )}`
  }
}
