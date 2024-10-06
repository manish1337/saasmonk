import { Response } from "express";
import { ApiResponse } from "../types/ApiResponse";

export const handleError = (
  res: Response,
  error: unknown,
  statusCode: number = 500
): void => {
  console.error("Error:", error);
  const errorMessage =
    error instanceof Error ? error.message : "An unknown error occurred";
  const response: ApiResponse<null> = {
    success: false,
    error: errorMessage,
  };
  res.status(statusCode).json(response);
};
