import dotenv from "dotenv";
import path from "node:path";
import { logger } from "../../../logger";
import { Config } from "./model";

function loadEnvironment() {
  const environment = process.env.NODE_ENV || "dev";
  const environmentFile = `.env.${environment}`;
  const environmentPath = path.resolve(process.cwd(), environmentFile);

  logger.info(`Loading env file: ${environmentFile}`);

  const result = dotenv.config({ path: environmentPath });

  if (result.error) {
    logger.error(
      `Failed to load env file at path: ${environmentPath}. Error: ${result.error.message}`
    );
  } else {
    logger.info(`Env file loaded successfully.`);
  }
}

loadEnvironment();

const environment = process.env.NODE_ENV ?? "dev";

export const isDevelopment = environment === "dev";
export const isProduction = environment === "prod";

const config: Config = {
  port: Number(process.env.PORT) || 3000,
} as const;

export default config;
