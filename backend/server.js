const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./config/db');
require('dotenv').config();

const { register, login, getEmail } = require('./controllers/authController');
const authMiddleware = require('./middlewares/authMiddleware');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Routes
app.post('/api/register', register);
app.post('/api/login', login);
app.get('/api/email', authMiddleware, getEmail);

// Database and Server
connectDB();
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
