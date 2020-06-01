import { createBufferFromCanvas } from "../createBufferFromCanvas"
import { Vector2, Transform, ShapeStyle, vec2 } from "./types"

export type CanvasDrawable = {
  /** will be called by Canvas.draw(). context is cleaned beforehand. */
  draw: (
    context: CanvasRenderingContext2D,
    applyContext: Canvas["applyContext"],
  ) => void
}

export class Canvas {
  private element: HTMLCanvasElement
  private context: CanvasRenderingContext2D

  constructor() {
    this.element = document.createElement("canvas")
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    this.context = this.element.getContext("2d")!

    // saving a clean context to restore before every draw
    this.context.save()
  }

  set size({ x, y }: Vector2) {
    this.element.width = x
    this.element.height = y
  }

  // cause why not
  get size(): Vector2 {
    return vec2(this.element.width, this.element.height)
  }

  get buffer(): Promise<Buffer> {
    // may need to just move this function's code in here
    return createBufferFromCanvas(this.element)
  }

  /** applies position and rotation only, not dimensions.*/
  private applyContext = (transform: Transform, style: ShapeStyle) => {
    const { context } = this

    context.rotate(transform.rotation)
    context.translate(...transform.position.tuple)

    context.lineWidth = style.strokeWeight
    context.strokeStyle = style.strokeColor
    context.fillStyle = style.fillColor
  }

  /** will call drawable.draw(). context is cleaned beforehand. */
  draw = (drawable: CanvasDrawable) => {
    const { context } = this

    context.restore() // clean context
    drawable.draw(context, this.applyContext)
  }

  // needs to go to its own class, but later
  drawImage = (image: HTMLImageElement, { x, y }: Vector2) => {
    this.context.drawImage(image, x, y, image.width, image.height)
  }
}
