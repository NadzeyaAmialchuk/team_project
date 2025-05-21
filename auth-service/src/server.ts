import express from "express";
import config from "./config/env";
import { logger } from "./logger";
import helmet from "helmet";

export const app = express();

app.use(helmet());
app.use(express.json());

app.listen(() => {
  logger.info(`Server listening at http://localhost:${config.port}`);
});
