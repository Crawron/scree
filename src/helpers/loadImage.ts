import { promises } from "fs"
const { readFile } = promises

export async function loadImage(path: string) {
  const buffer = await readFile(path)
  const blob = new Blob([new Uint8Array(buffer)])
  return blob
}
