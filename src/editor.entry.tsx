import { ipcRenderer } from "electron"
import React, { useEffect, useRef, useState } from "react"
import ReactDOM from "react-dom"
import "./hotkeys"

const App = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [data, setData] = useState<{
    dataUrl: string
    dimensions: [number, number]
  }>()

  function loadImage() {
    ipcRenderer.on("loadImageDone", (_, data) => setData(data))
    ipcRenderer.send("loadImage")
  }

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

  return (
    <>
      <canvas ref={canvasRef}></canvas>
      <br />
      <button onClick={loadImage}>Load Image</button>
    </>
  )
}

ReactDOM.render(<App />, document.getElementById("app"))
