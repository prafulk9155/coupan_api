// routes/userRoutes.js
const express = require('express');
const { signup } = require('../controllers/userController');
const router = express.Router();

router.post('/signup', signup);
// Additional routes for login go here...

module.exports = router;
