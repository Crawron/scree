import { ImageBuffer } from "./ImageBuffer"
import { createIpcEvent, createIpcRequestResponse } from "./ipc"

export const captureFullScreenEvent = createIpcEvent("captureFullScreen")

export const loadImageEvent = createIpcRequestResponse<
  unknown,
  ImageBuffer | undefined
>("loadImage")
