import winston from "winston";
import path from "node:path";
import fs from "node:fs";

export const logDirectory = path.resolve(process.cwd(), "logs");
if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory);
}

const { combine, timestamp, printf, colorize, errors } = winston.format;

const consoleFormat = combine(
  colorize(),
  timestamp(),
  printf(({ level, message, timestamp }) => {
    return `${timestamp} [${level}]: ${message}`;
  })
);

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

export const requestLogger = winston.createLogger({
  level: "info",
  format: fileFormat,
  transports: [
    new winston.transports.Console({
      format: consoleFormat,
    }),
    new winston.transports.File({
      filename: path.join(logDirectory, "request.log"),
      format: fileFormat,
    }),
  ],
});
