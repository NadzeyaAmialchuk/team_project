import dotenv from "dotenv";
import path from "node:path";
import { logger } from "../../logger";
import { Config } from "./model";

function loadEnvironment() {
  const environment = process.env.NODE_ENV || "dev";
  const environmentFile = `.env.${environment}`;
  const environmentPath = path.resolve(process.cwd(), environmentFile);

  logger.info(`Loading env file: ${environmentFile}`);
  dotenv.config({ path: environmentPath });
}

loadEnvironment();

const environment = process.env.NODE_ENV ?? "dev";

const isDevelopment = environment === "dev";
const isProduction = environment === "prod";

const config: Config = {
  port: Number(process.env.PORT) || 3000,
  isDev: isDevelopment,
  isProd: isProduction,
};

export default config;
