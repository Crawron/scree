import "./index.css"
import React, { useRef, useEffect, createElement } from "react"
import { remote } from "electron"
const { dialog } = remote
import ReactDOM from "react-dom"

const App = () => {
  const fileInputRef = useRef<HTMLInputElement>(null)
  let canvas: HTMLCanvasElement | null = null

  async function selectImage() {
    console.log("loading image...")
    dialog.showOpenDialog()
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
      {canvas ? canvas : ""}
    </>
  )
}

ReactDOM.render(<App />, document.getElementById("app"))

module.hot!.accept(() => {
  location.reload()
})
