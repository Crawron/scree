export function createBufferFromCanvas(canvas: HTMLCanvasElement) {
  return new Promise<Buffer>((resolve, reject) => {
    canvas.toBlob(async (blob) => {
      try {
        if (blob) {
          resolve(Buffer.from(await blob.arrayBuffer()))
        } else {
          reject("Failed to create blob")
        }
      } catch (error) {
        reject(error)
      }
    })
  })
}
