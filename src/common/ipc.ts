import { createIpcChannel, createTypesafeIpc } from "electron-typesafe-ipc"
import { LoadImageResult } from "../main/editor/loadImageFromFileDialog"

const ipcSchema = {
  // main -> renderer
  main: {
    loadImageDone: createIpcChannel<LoadImageResult>({ msg: "loadImageDone" }),
  },
  // renderer -> main
  rend: {
    loadImage: createIpcChannel({ msg: "loadImage" }),
  },
}

export const ipc = createTypesafeIpc(ipcSchema)
