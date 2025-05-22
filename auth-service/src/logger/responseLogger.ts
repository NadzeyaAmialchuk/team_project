import winston from "winston";
import path from "node:path";
import { logDirectory, logFormat } from ".";

const { combine, timestamp, colorize, printf, errors } = winston.format;

const fileFormat = combine(
  timestamp(),
  errors({ stack: true }),
  printf(({ timestamp, level, message, ...meta }) => {
    const metaString =
      Object.keys(meta).length > 0 ? JSON.stringify(meta, null, 2) : "";
    return `${timestamp} [${level}]: ${message}${
      metaString ? "\n" + metaString : ""
    }\n\n`;
  })
);

export const responseLogger = winston.createLogger({
  level: "info",
  format: combine(timestamp(), logFormat),
  transports: [
    new winston.transports.Console({
      format: combine(colorize(), timestamp(), logFormat),
    }),
    new winston.transports.File({
      filename: path.join(logDirectory, "response.log"),
      format: fileFormat,
    }),
  ],
});
