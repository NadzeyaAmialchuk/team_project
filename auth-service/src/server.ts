import { app } from "./app";
import config from "./config/env";
import { logger } from "./logger";

app.listen(config.port, () => {
  logger.info(`Server listening at http://localhost:${config.port}`);
});
