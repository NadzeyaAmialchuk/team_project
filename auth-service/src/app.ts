import express from "express";
import helmet from "helmet";
import { router as loginRouter } from "./routes/auth/login";
import { API_V1 } from "./shared/constants/api/version";

export const app = express();

app.use(helmet());
app.use(express.json());

app.use(API_V1, loginRouter);
