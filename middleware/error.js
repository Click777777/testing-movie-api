const winston = require("winston");
require("winston-mongodb");
require("express-async-errors");

// process.on("uncaughtException", (ex) => {
//   logger.error(ex.message);
// });

winston.exceptions.handle(
  new winston.transports.File({ filename: "uncaughtException.log" }),
  new winston.transports.Console()
);

process.on("unhandledRejection", (ex) => {
  throw ex;
  // logger.error(ex.message);
});

const logger = winston.createLogger({
  level: "error",
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: "error.log", level: "error" }),
    new winston.transports.Console(),
    new winston.transports.MongoDB({
      db: "mongodb://0.0.0.0:27017/movie",
      options: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      collection: "allErrorLogs",
      level: "error",
    }),
  ],
});

const error = (error, req, res, next) => {
  res.status(500).send("Server Internal Error");

  logger.log({
    level: "error",
    message: error.message,
  });
};

module.exports = error;
