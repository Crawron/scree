import { ipcRenderer, IpcRendererEvent, WebContents } from "electron"

export function createIpcEvent<T>(eventName: string) {
  return {
    get main() {
      return {
        send(webContents: WebContents, data: T) {
          webContents.send(eventName, data)
        },
      }
    },
    get renderer() {
      return {
        listen(callback: (data: T) => void) {
          const handler = (_: IpcRendererEvent, data: T) => callback(data)

          ipcRenderer.on(eventName, handler)
          return () => {
            ipcRenderer.off(eventName, handler)
          }
        },
      }
    },
  }
}
