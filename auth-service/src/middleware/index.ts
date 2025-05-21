import { requestLoggerMiddleware } from "../middleware/logger/requestLoggerMiddleware";
import { responseLoggerMiddleware } from "../middleware/logger/responseLoggerMiddleware";
import { errorLoggerMiddleware } from "../middleware/logger/errorLoggerMiddleware";
import { errorHandlerMiddleware } from "../middleware/error";
import { app } from "server";

app.use(requestLoggerMiddleware);
app.use(responseLoggerMiddleware);
app.use(errorLoggerMiddleware);
app.use(errorHandlerMiddleware);
