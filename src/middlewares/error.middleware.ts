import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";

// Custom ApiError
import ApiError from "../error/apiError";
import sendResponse from "../utils/sendResponse";

const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // Custom API Error
  if (err instanceof ApiError) {
    return sendResponse(res, {
      status: err.statusCode,
      success: false,
      message: err.message,
    });
  }

  // Prisma Known Errors
  if (err.code === "P2002") {
    return sendResponse(res, {
      status: httpStatus.CONFLICT,
      success: false,
      message: "Duplicate field value entered",
      data: err.meta?.target,
    });
  }

  if (err.code === "P2025") {
    return sendResponse(res, {
      status: httpStatus.NOT_FOUND,
      success: false,
      message: "Record not found",
    });
  }

  // JWT Errors
  if (err.name === "JsonWebTokenError") {
    return sendResponse(res, {
      status: httpStatus.UNAUTHORIZED,
      success: false,
      message: "Invalid token",
    });
  }

  if (err.name === "TokenExpiredError") {
    return sendResponse(res, {
      status: httpStatus.UNAUTHORIZED,
      success: false,
      message: "Token expired",
    });
  }

  //  Validation Error (Zod)
  if (err.name === "ZodError") {
    return sendResponse(res, {
      status: httpStatus.BAD_REQUEST,
      success: false,
      message: "Validation error",
      data: err.errors,
    });
  }

  // Fallback
  console.error("🔥 Unexpected Error:", err);

  return sendResponse(res, {
    status: httpStatus.INTERNAL_SERVER_ERROR,
    success: false,
    message: "Internal Server Error",
  });
};

export default errorHandler;
