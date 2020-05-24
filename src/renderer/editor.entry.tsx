import {} from "@emotion/react"
import { ipcRenderer } from "electron"
import React, { useEffect, useRef, useState } from "react"
import ReactDOM from "react-dom"
import tw from "twin.macro"
import { loadImage } from "./loadImage"

const App = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [data, setData] = useState<{
    url: string
    dimensions: [number, number]
  }>()

  useEffect(() => {
    ipcRenderer.on("loadImageDone", (_, data) => setData(data))
  }, [])

  function sendIpcLoadImage() {
    ipcRenderer.send("loadImage")
  }

  useEffect(() => {
    if (!data || !canvasRef.current) return

    const [width, height] = data.dimensions

    ;(async () => {
      canvasRef.current
        ?.getContext("2d")
        ?.drawImage(await loadImage(data.url), 0, 0)
    })()

    canvasRef.current.width = width
    canvasRef.current.height = height
  }, [data])

  return (
    <>
      <canvas ref={canvasRef}></canvas> <br />
      <button
        onClick={sendIpcLoadImage}
        css={tw`bg-blue-500 text-white p-2 rounded-sm shadow-lg hover:bg-blue-400 transition-colors duration-300`}
      >
        Load Image
      </button>
    </>
  )
}

ReactDOM.render(<App />, document.getElementById("app"))
