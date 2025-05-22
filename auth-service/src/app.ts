import express from "express";
import helmet from "helmet";
import { router as loginRouter } from "./routes/auth/login";
import { API_V1 } from "./shared/constants/api/version";
import { requestLoggerMiddleware } from "./middleware/logger/requestLoggerMiddleware";
import { responseLoggerMiddleware } from "./middleware/logger/responseLoggerMiddleware";
import { errorLoggerMiddleware } from "./middleware/logger/errorLoggerMiddleware";
import { errorHandlerMiddleware } from "./middleware/error";

const app = express();

app.use(helmet());
app.use(express.json());
app.use(requestLoggerMiddleware);
app.use(responseLoggerMiddleware);
app.use(errorLoggerMiddleware);
app.use(errorHandlerMiddleware);

app.use(API_V1, loginRouter);

export { app };
