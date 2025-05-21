import expressWinston from "express-winston";
import { requestLogger } from "../../config/logger";

export const requestLoggerMiddleware = expressWinston.logger({
  winstonInstance: requestLogger,
  meta: true,
  msg: "{{req.method}} {{req.url}} {{res.statusCode}} {{res.responseTime}}ms",
  colorize: false,
  dynamicMeta: (req, res) => ({
    headers: req.headers,
    query: req.query,
    params: req.params,
    body: req.body,
  }),
});
