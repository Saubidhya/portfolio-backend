const createError = require('http-errors');

// 404 Not Found Middleware
const notFound = (req, res, next) => {
  next(createError(404, `🔍 Endpoint not found: ${req.originalUrl}`));
};

// Global Error Handler Middleware
const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // Log error for development
  console.error('❌ Error Stack:', err.stack);

  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    const message = '🆔 Resource not found with provided ID';
    error = createError(404, message);
  }

  // Mongoose duplicate key error
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    const value = err.keyValue[field];
    const message = `📝 Duplicate field value: ${field} '${value}' already exists`;
    error = createError(400, message);
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map(val => val.message);
    const message = `📋 Validation failed: ${messages.join(', ')}`;
    error = createError(400, message);
  }

  // Mongoose collection name error
  if (err.message && err.message.includes('collection name must be a string')) {
    const message = '📛 Invalid collection name';
    error = createError(400, message);
  }

  res.status(error.status || 500).json({
    success: false,
    error: {
      status: error.status || 500,
      message: error.message || '🚨 Internal Server Error',
      // Include stack trace in development only
      ...(process.env.NODE_ENV === 'development' && { stack: error.stack })
    }
  });
};

module.exports = {
  notFound,
  errorHandler
};