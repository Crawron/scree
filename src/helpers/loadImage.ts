import Sharp from "sharp"

export async function loadImage(path: string) {
  const image = Sharp(path)
  const metadata = await image.metadata()
  const buffer = await image.raw().toBuffer()

  if (!metadata.width) return

  const imageData = new ImageData(new Uint8ClampedArray(buffer), metadata.width)
  return createImageBitmap(imageData)
}
