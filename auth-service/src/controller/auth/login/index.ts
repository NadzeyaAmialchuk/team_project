import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { isDevelopment, isProduction } from "../../../shared/config/env";
import { HTTP_STATUS } from "../../../shared/constants/api/code";

export async function loginController(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const errors = validationResult(request);

    if (!errors.isEmpty() && isDevelopment) {
      response.status(HTTP_STATUS.BAD_REQUEST).json({ errors: errors.array() });

      return;
    }

    if (!errors.isEmpty() && isProduction) {
      response.status(HTTP_STATUS.BAD_REQUEST).end();

      return;
    }

    response.status(200).end();
  } catch (error) {
    next(error);
  }
}
