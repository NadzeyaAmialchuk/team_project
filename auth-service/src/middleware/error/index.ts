import { Request, Response, NextFunction } from "express";
import { logger } from "../../logger";

export function errorHandlerMiddleware(
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction
) {
  logger.error(error);
  next(error);
}
