import winston from "winston";
import path from "node:path";
import fs from "node:fs";

const logDirectory = path.resolve(process.cwd(), "logs");
if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory);
}

const { combine, timestamp, printf, colorize, errors } = winston.format;

const logFormat = printf(({ level, message, timestamp, stack }) => {
  return stack
    ? `${timestamp} [${level}]: ${message}\n${stack}`
    : `${timestamp} [${level}]: ${message}`;
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

export const requestLogger = winston.createLogger({
  level: "info",
  format: combine(timestamp(), logFormat),
  transports: [
    new winston.transports.Console({
      format: combine(colorize(), timestamp(), logFormat),
    }),
    new winston.transports.File({
      filename: path.join(logDirectory, "request.log"),
    }),
  ],
});

export const responseLogger = winston.createLogger({
  level: "info",
  format: combine(timestamp(), logFormat),
  transports: [
    new winston.transports.Console({
      format: combine(colorize(), timestamp(), logFormat),
    }),
    new winston.transports.File({
      filename: path.join(logDirectory, "response.log"),
    }),
  ],
});
