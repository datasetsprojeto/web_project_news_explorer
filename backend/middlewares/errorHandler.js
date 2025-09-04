const errorHandler = (err, req, res, next) => {
  let { statusCode = 500, message } = err;

  // Don't expose internal errors in production
  if (statusCode === 500 && process.env.NODE_ENV === 'production') {
    message = 'An error occurred on the server';
  }

  // Log the error
  console.error('Error:', {
    message: err.message,
    stack: err.stack,
    statusCode: err.statusCode,
    url: req.url,
    method: req.method
  });

  res.status(statusCode).send({
    message: message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};

module.exports = errorHandler;