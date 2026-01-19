// Error status and message
export class AppError extends Error {
  status: string;

  constructor(
    public code: number,
    message: string,
  ) {
    super(message);
    this.status = `${code}`.startsWith("4") ? "fail" : "error";

    Object.setPrototypeOf(this, AppError.prototype);
  }
}
