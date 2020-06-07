import {
  ipcMain,
  IpcMainEvent,
  ipcRenderer,
  IpcRendererEvent,
  WebContents,
} from "electron"
import { showErrorMessage } from "./showErrorMessage"

// TODO: add renderer -> main communication when we need it
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

// TODO: add main -> renderer communication when we need it
export function createIpcRequestResponse<TRequest, TResponse>(
  eventName: string,
) {
  return {
    get main() {
      return {
        listen(handleRequest: (request: TRequest) => Promise<TResponse>) {
          const handler = async (event: IpcMainEvent, request: TRequest) => {
            try {
              event.reply(eventName, await handleRequest(request))
            } catch (error) {
              showErrorMessage(error)
            }
          }

          ipcMain.on(eventName, handler)
          return () => {
            ipcMain.off(eventName, handler)
          }
        },
      }
    },
    get renderer() {
      return {
        request(request: TRequest) {
          return new Promise<TResponse>((resolve) => {
            ipcRenderer.send(eventName, request)

            ipcRenderer.once(eventName, (_, response: TResponse) => {
              resolve(response)
            })
          })
        },
      }
    },
  }
}
