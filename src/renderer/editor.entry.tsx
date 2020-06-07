import {} from "@emotion/react"
import { ipcRenderer } from "electron"
import React, { useEffect, useRef, useState } from "react"
import ReactDOM from "react-dom"
import tw from "twin.macro"
import { loadImage } from "./loadImage"
import { ImageBufferData } from "../common/ImageBufferData"

const App = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [data, setData] = useState<ImageBufferData>()

  useEffect(() => {
    ipcRenderer.on("loadImageDone", (_, data) => setData(data))
  }, [])

  function sendIpcLoadImage() {
    ipcRenderer.send("loadImage")
  }

  useEffect(() => {
    console.log(data)
    if (!data || !canvasRef.current) return

    const { x: width, y: height } = data.metadata.size

    console.log("cool", data.dataUrl)
    ;(async () => {
      canvasRef.current
        ?.getContext("2d")
        ?.drawImage(await loadImage(data.dataUrl), 0, 0)
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
