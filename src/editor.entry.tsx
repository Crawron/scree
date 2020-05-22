import { remote } from "electron"
import React, { useRef } from "react"
import ReactDOM from "react-dom"

const { dialog } = remote

const App = () => {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const canvas: HTMLCanvasElement | null = null

  async function selectImage() {
    console.log("loading image...")
    dialog.showOpenDialog({})
    return /*
    fileInputRef.current!.click()

    const fileBuffer = fileInputRef.current?.files?.[0]
    if (!fileBuffer) return console.log("couldnt load image")

    const imageBitmap = await createImageBitmap(fileBuffer)
    canvas = document.createElement("canvas")
    canvas.getContext("2d")!.drawImage(imageBitmap, 0, 0)*/
  }

  return (
    <>
      <input
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        ref={fileInputRef}
      />
      <button onClick={selectImage}>Load Image</button>
      {canvas}
    </>
  )
}

ReactDOM.render(<App />, document.getElementById("app"))
