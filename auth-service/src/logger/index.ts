import winston from "winston";
import path from "node:path";
import fs from "node:fs";

export const logDirectory = path.resolve(process.cwd(), "logs");
if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory);
}

const { combine, timestamp, printf, colorize, errors } = winston.format;

export const logFormat = printf(({ level, message, timestamp, stack }) => {
  return stack
    ? `\n${timestamp} [${level}]: ${message}\n${stack}`
    : `\n${timestamp} [${level}]: ${message}`;
});

export const logger = winston.createLogger({
  level: "info",
  format: combine(timestamp(), errors({ stack: true }), logFormat),
  transports: [
    new winston.transports.Console({
      format: combine(
        colorize(),
        timestamp(),
        errors({ stack: true }),
        logFormat
      ),
    }),
    new winston.transports.File({
      filename: path.join(logDirectory, "error.log"),
      level: "error",
      handleExceptions: true,
    }),
  ],
  exitOnError: false,
});
