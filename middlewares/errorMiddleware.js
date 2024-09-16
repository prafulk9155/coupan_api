// middlewares/errorMiddleware.js

const errorHandler = (err, req, res, next) => {
    // Log the error (could be improved with a logger)
    console.error(err.stack);
    
    res.status(err.status || 500); 
    res.json({
      message: err.message,
      // Optionally include stack trace only in development
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    });
  };
  
  // Usage example for specific routes
  const createError = (msg, status) => new Error(msg, status);
  
  module.exports = { errorHandler, createError };
  