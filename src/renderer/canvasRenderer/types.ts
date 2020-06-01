type Color = string // string for now

export type ShapeStyle = {
  strokeColor: Color
  fillColor: Color
  strokeWeight: number // in pixels
  // corner and cap shape pending
}

export class Vector2 {
  constructor(public x: number, public y: number) {}

  get tuple(): [number, number] {
    return [this.x, this.y]
  }
}
export const vec2 = (x = 0, y = x): Vector2 => new Vector2(x, y)
// imagine i made this `(x?: number, y?: number) => [x ?? 0, y ?? x ?? 0]`

export type Transform = {
  position: Vector2
  dimensions: Vector2
  rotation: number // in radians
}

export const createTransform = (
  position = vec2(),
  dimensions = vec2(100),
  rotation = 0,
): Transform => {
  return { position, dimensions, rotation }
}
