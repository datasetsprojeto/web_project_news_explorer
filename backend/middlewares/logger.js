const winston = require('winston');
const expressWinston = require('express-winston');

// Request logger
const requestLogger = expressWinston.logger({
  transports: [
    new winston.transports.File({ filename: 'logs/request.log' }),
  ],
  format: winston.format.json(),
});

// Error logger
const errorLogger = expressWinston.errorLogger({
  transports: [
    new winston.transports.File({ filename: 'logs/error.log' }),
  ],
  format: winston.format.json(),
});

module.exports = {
  requestLogger,
  errorLogger,
};