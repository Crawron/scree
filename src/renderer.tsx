import "./index.css"

import React, { useState, useRef, useEffect } from "react"
import ReactDOM from "react-dom"

import { remote, ipcRenderer } from "electron"
const { dialog } = remote

const App = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [path, setPath] = useState<string>("")

  useEffect(() => {
    if (!path) return
    ipcRenderer.emit("open-image", path)
    ipcRenderer.on("loaded-image", (event, bitmap: ImageBitmap) => {
      const canvasCtx = canvasRef.current?.getContext("2d")
      canvasCtx?.drawImage(bitmap, 0, 0)
    })
  }, [path])

  async function selectImage() {
    const dialogResult = await dialog.showOpenDialog({
      properties: ["openFile"],
    })

    if (!dialogResult.canceled) setPath(dialogResult.filePaths[0])
  }

  return (
    <>
      {path ? <canvas ref={canvasRef}></canvas> : ""}
      <br />
      <button onClick={selectImage}>Load Image</button>
    </>
  )
}

ReactDOM.render(<App />, document.getElementById("app"))

if (module.hot) {
  module.hot.accept(() => {
    location.reload()
  })
}
