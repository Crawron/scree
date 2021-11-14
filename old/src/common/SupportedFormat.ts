export const supportedFormats = [
  "jpg",
  "jpeg",
  "png",
  "webp",
  "tiff",
  "gif",
] as const
export type SupportedFormat = typeof supportedFormats[number]

export function isSupportedFormat(format: string): format is SupportedFormat {
  return supportedFormats.includes(format.toLowerCase() as SupportedFormat)
}
