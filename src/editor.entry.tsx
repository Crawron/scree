import { remote, ipcRenderer } from "electron"
import React, { useEffect, useRef, useState } from "react"
import ReactDOM from "react-dom"
import "./hotkeys"

const { dialog } = remote

const App = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [path, setPath] = useState<string>("")
  const [data, setData] = useState<{
    dataUrl: string
    dimensions: [number, number]
  }>()

  useEffect(() => {
    if (!path) return
    setData(ipcRenderer.sendSync("loadImage", path))
  }, [path])

  useEffect(() => {
    if (!data) return

    const [width, height] = data.dimensions

    const image = new Image(width, height)
    image.onload = () =>
      canvasRef.current?.getContext("2d")?.drawImage(image, 0, 0)

    image.src = data.dataUrl

    canvasRef.current && (canvasRef.current.width = width)
    canvasRef.current && (canvasRef.current.height = height)
  }, [data])

  async function selectImage() {
    const dialogResult = await dialog.showOpenDialog({
      properties: ["openFile"],
    })

    if (!dialogResult.canceled) setPath(dialogResult.filePaths[0])
  }

  return (
    <>
      <canvas ref={canvasRef}></canvas>
      <br />
      <button onClick={selectImage}>Load Image</button>
    </>
  )
}

ReactDOM.render(<App />, document.getElementById("app"))
