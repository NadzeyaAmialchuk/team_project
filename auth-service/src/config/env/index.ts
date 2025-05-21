import dotenv from "dotenv";
import path from "path";
import { logger } from "../logger";
import { Config } from "./index.model";

function loadEnv() {
  const env = process.env.NODE_ENV || "dev";
  const envFile = `.env.${env}`;
  const envPath = path.resolve(process.cwd(), envFile);

  logger.info(`Loading env file: ${envFile}`);
  dotenv.config({ path: envPath });
}

loadEnv();

const config: Config = {
  port: Number(process.env.PORT) || 3000,
};

export default config;
