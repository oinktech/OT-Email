const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  const { username, password } = req.body;
  const email = `${username}@${process.env.EMAIL_DOMAIN}`;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully', email });
  } catch (error) {
    res.status(400).json({ error: 'User already exists' });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, email: user.email });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getEmail = async (req, res) => {
  const { userId } = req.user;

  try {
    const user = await User.findById(userId);
    res.json({ email: user.email });
  } catch {
    res.status(401).json({ error: 'Unauthorized' });
  }
};
