import { Request, Response, NextFunction } from "express";
import { responseLogger } from "../../logger/responseLogger";

export function responseLoggerMiddleware(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const oldSend = response.send.bind(response);
  let responseBody: null;

  response.send = (body) => {
    responseBody = body;
    return oldSend(body);
  };

  response.on("finish", () => {
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
