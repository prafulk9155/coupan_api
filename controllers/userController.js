// controllers/userController.js
const User = require('../models/User');
const bcrypt = require('bcryptjs');

exports.signup = async (req, res) => {
  const { username, email, gender, interest, phone, password, address } = req.body.data;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      username,
      email,
      gender,
      interest,
      phone,
      password: hashedPassword,
      address,
    });

    await user.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error while creating user' ,error});
  }
};

// Additional methods like login, etc., can be implemented here.
