import expressWinston from "express-winston";
import { requestLogger } from "../../logger/requestLogger";

export const requestLoggerMiddleware = expressWinston.logger({
  winstonInstance: requestLogger,
  meta: true,
  msg: "{{req.method}} {{req.url}} {{res.statusCode}} {{res.responseTime}}ms",
  colorize: false,
  dynamicMeta: (request) => ({
    headers: request.headers,
    query: request.query,
    params: request.params,
    body: request.body,
  }),
});
