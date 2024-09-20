// src/middlewares/errorHandler.ts
import { Request, Response } from "express";
import { CustomError } from "../utils/customError";

export const errorHandler = (
  err: Error | CustomError,
  req: Request,
  res: Response
) => {
  let statusCode = 500;
  let message = "Internal Server Error";

  if (err instanceof CustomError) {
    statusCode = err.statusCode || 500;
    message = err.message;
  }

  console.error(`[ERROR] ${statusCode} - ${message}`);

  return res.status(statusCode).json({
    success: false,
    message,
  });
};
