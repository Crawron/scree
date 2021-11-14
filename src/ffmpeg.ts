import { path } from "@ffmpeg-installer/ffmpeg"
import execa from "execa"

export function ffmpeg(flags: string | string[]) {
  return execa(path, [flags].flat().join(" ").split(/\s+/), {})
}
