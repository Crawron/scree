export function toError(value: unknown): Error {
  return value instanceof Error ? value : new Error(`${value}`)
}
