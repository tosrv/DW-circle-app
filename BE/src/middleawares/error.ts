// Global error handler
import { Request, Response, NextFunction } from "express";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const code = err.code || 500;
  const status = err.status || "error";
  const message = err.message || "Internal server error";

  res.status(code).json({
    status: status,
    message: message,
  });
};
