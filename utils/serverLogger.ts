import winston from "winston";
import expressWinston from "express-winston";

const colorizer = winston.format.colorize();

const fileFormat = winston.format.combine(
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  winston.format.align(),
  winston.format.printf((info) => {
    return `${info.timestamp} :: [${info.level.toUpperCase()}] ${
      info.message
    }\n[RESPONSE]:: ${JSON.stringify(
      info.meta.res
    )}\n[HEADERS]:: ${JSON.stringify(info.meta.req.headers)}${
      Object.keys(info.meta.req.query).length
        ? `\n[QUERY]:: ${JSON.stringify(info.meta.req.query)}`
        : ""
    }\n`;
  })
);

const consoleFormat = winston.format.combine(
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  winston.format.align(),
  winston.format.printf((info) => {
    return `${colorizer.colorize(
      info.level,
      `SERVER::${info.level.toUpperCase()}:`
    )} ${info.message}`;
  })
);

const serverLogger = expressWinston.logger({
  transports: [
    new winston.transports.Console({
      format: consoleFormat,
    }),
    new winston.transports.File({
      filename: ".server/error.log",
      level: "error",
      format: fileFormat,
    }),
    new winston.transports.File({
      filename: ".server/taxtds.log",
      level: "info",
      format: fileFormat,
    }),
  ],
  meta: true,
  expressFormat: true,
});

export default serverLogger;
