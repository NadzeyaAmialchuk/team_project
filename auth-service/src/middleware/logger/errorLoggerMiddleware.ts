import expressWinston from "express-winston";
import { logger } from "../../logger";

export const errorLoggerMiddleware = expressWinston.errorLogger({
  winstonInstance: logger,
  level: "error",
});
