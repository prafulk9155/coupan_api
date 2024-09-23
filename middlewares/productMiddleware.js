// middleware/productMiddleware.js

const fs = require("fs");
const path = require("path");

// Create a log file stream
const logStream = fs.createWriteStream(path.join(__dirname, '../logs/server.log'), { flags: 'a' }); // Append mode

// Logging Middleware for Coupon Router
const productMiddleware = (req, res, next) => {
  const currentTime = new Date().toISOString();

  // Log incoming request details
  const logEntry = {
    time: currentTime,
    ip: req.ip,
    method: req.method,
    url: req.originalUrl,
    requestBody: req.body,
  };
  
  // Log to console
//   console.log(`********** Product Router **********`);
  console.log(`Incoming Request:`, logEntry.method, logEntry.url);

  // Capture the original send function
  const originalSend = res.send.bind(res);
  
  // Create a response log entry
  res.send = function (body) {
    const responseLog = {
      status: res.statusCode,
      responseBody: body,
    };

    // Log to console
    console.log(`Response:`, responseLog.status, responseLog.responseBody);
    
    // Log to file
    logStream.write(`Incoming Request for product: ${JSON.stringify(logEntry)}\nOutgoing Response: ${JSON.stringify(responseLog)}\n\n`);
    
    return originalSend(body); // Call original send method
  };

  next();
};

module.exports = productMiddleware;
