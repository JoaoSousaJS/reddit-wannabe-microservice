export abstract class CustomError extends Error {
  abstract statusCode: number

  constructor(message: string) {
    super(message)
    Object.setPrototypeOf(this, CustomError.prototype)
  }

  serializeErrors() {
    return [{message: this.message}]
  }
}