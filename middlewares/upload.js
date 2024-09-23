// middleware/upload.js

const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Create Storage Directory if it doesn't exist
const storageDir = path.join(__dirname, '../storage/product');
if (!fs.existsSync(storageDir)) {
    fs.mkdirSync(storageDir, { recursive: true }); // Creates the directory if it doesn't exist
}

// Set up the storage configuration for multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, storageDir); // Specify the storage directory
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9); // Append unique suffix
        const ext = path.extname(file.originalname); // Get the file extension
        cb(null, file.fieldname + '-' + uniqueSuffix + ext); // Set the file name
    }
});

// Create the upload middleware
const upload = multer({ storage });

module.exports = upload;
