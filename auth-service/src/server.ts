import express from "express";
import { requestLoggerMiddleware } from "./middleware/logger/requestLoggerMiddleware";
import { responseLoggerMiddleware } from "./middleware/logger/responseLoggerMiddleware";
import { errorLoggerMiddleware } from "./middleware/logger/errorLoggerMiddleware";
import { errorHandlerMiddleware } from "./middleware/error";
import config from "./config/env";
import { logger } from "./logger";
import helmet from "helmet";

export const app = express();

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLoggerMiddleware);
app.use(responseLoggerMiddleware);
app.use(errorLoggerMiddleware);
app.use(errorHandlerMiddleware);

app.listen(() => {
  logger.info(`Server listening at http://localhost:${config.port}`);
});
