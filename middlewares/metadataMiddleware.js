// middleware/metadataMiddleware.js

const fs = require("fs");
const path = require("path");

// Create logs directory if it doesn't exist
const logsDir = path.join(__dirname, '../logs');
if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir);
}

// Create a log file stream
const logStream = fs.createWriteStream(path.join(__dirname, '../logs/server.log'), { flags: 'a' }); // Append mode

// Logging Middleware for Metadata Router
const metadataMiddleware = (req, res, next) => {
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
    // console.log(`********** Metadata Router **********`);
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
        logStream.write(`Incoming Request for metadata: ${JSON.stringify(logEntry)}\nOutgoing Response: ${JSON.stringify(responseLog)}\n\n`);
        
        return originalSend(body); // Call original send method
    };

    next();
};

module.exports = metadataMiddleware;
