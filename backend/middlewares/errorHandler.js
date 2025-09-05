const errorHandler = (err, req, res) => {
  const statusCode = err.statusCode || 500;
  let { message } = err;

  if (statusCode === 500 && process.env.NODE_ENV === 'production') {
    message = 'An error occurred on the server';
  }

  console.error('Error:', {
    message: err.message,
    stack: err.stack,
    statusCode: err.statusCode,
    url: req.url,
    method: req.method,
  });

  res.status(statusCode).send({
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};

module.exports = errorHandler;
