import {} from "@emotion/react"
import React, { useEffect, useRef, useState } from "react"
import ReactDOM from "react-dom"
import tw from "twin.macro"
import { ImageBuffer } from "../common/ImageBuffer"
import { loadImageEvent } from "../common/ipcEvents"
import { loadImage } from "./loadImage"
import { ImageBuffer } from "../common/ImageBuffer"

const App = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [data, setData] = useState<ImageBuffer>()

  async function sendIpcLoadImage() {
    const data = await loadImageEvent.renderer.request({})
    if (data) setData(data)
  }

  useEffect(() => {
    if (!data || !canvasRef.current) return

    const { x: width, y: height } = data.metadata.size

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
        css={tw`p-2 text-white transition-colors duration-300 bg-blue-500 rounded-sm shadow-lg hover:bg-blue-400`}
      >
        Load Image
      </button>
    </>
  )
}

ReactDOM.render(<App />, document.getElementById("app"))
