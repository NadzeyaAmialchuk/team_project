import express from "express";
import { requestLoggerMiddleware } from "./middleware/logger/requestLoggerMiddleware";
import { responseLoggerMiddleware } from "./middleware/logger/responseLoggerMiddleware";
import { errorLoggerMiddleware } from "./middleware/logger/errorLoggerMiddleware";
import { errorHandlerMiddleware } from "./middleware/error";
import config from "./config/env";

export const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLoggerMiddleware);
app.use(responseLoggerMiddleware);
app.use(errorLoggerMiddleware);
app.use(errorHandlerMiddleware);

app.listen(() => {
  console.log(`Server listening at http://localhost:${config.port}`);
});
