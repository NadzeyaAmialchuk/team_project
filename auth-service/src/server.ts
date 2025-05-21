import express from "express";
import { requestLoggerMiddleware } from "./middleware/logger/requestLoggerMiddleware";
import { responseLoggerMiddleware } from "./middleware/logger/responseLoggerMiddleware";
import { errorLoggerMiddleware } from "./middleware/logger/errorLoggerMiddleware";
import { errorHandlerMiddleware } from "./middleware/error";

export const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLoggerMiddleware);
app.use(responseLoggerMiddleware);
app.use(errorLoggerMiddleware);
app.use(errorHandlerMiddleware);

const port = 3000;
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
