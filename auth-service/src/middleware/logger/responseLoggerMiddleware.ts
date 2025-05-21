import { Request, Response, NextFunction } from "express";
import { responseLogger } from "../../config/logger";

export function responseLoggerMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const oldSend = res.send.bind(res);
  let responseBody: any;

  res.send = (body) => {
    responseBody = body;
    return oldSend(body);
  };

  res.on("finish", () => {
    responseLogger.info(
      `Response body: ${
        typeof responseBody === "object"
          ? JSON.stringify(responseBody)
          : responseBody
      }`
    );
  });

  next();
}
