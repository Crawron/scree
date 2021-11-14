import { Transform, ShapeStyle } from "./types"
import { CanvasDrawable } from "./canvas"

export class Ellipse {
  constructor(public style: ShapeStyle, public transform: Transform) {}

  draw: CanvasDrawable["draw"] = (context, applyContext) => {
    applyContext(this.transform, this.style)
    const { dimensions } = this.transform

    context.ellipse(0, 0, dimensions.x, dimensions.y, 0, 0, Math.PI * 2)
  }
}
