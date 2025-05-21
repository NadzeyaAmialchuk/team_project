import { Request, Response, NextFunction } from "express";
import { logger } from "../../config/logger";

export function errorHandlerMiddleware(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  logger.error(err);
  next(err);
}
