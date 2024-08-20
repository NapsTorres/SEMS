const express = require('express');
const connectDB = require('./config/db'); // MySQL connection
const cors = require('cors');
const app = express();
const sequelize = require('./config/database');
const Volleyball = require('./models/VolleyballModel');
const Soccer = require('./models/SoccerModel');
const Archive = require('./models/Archive');
const Badminton = require('./models/Badminton');
const Users = require('./models/User');
const Standings = require('./models/Standings');
require('dotenv').config();

// Synchronize the model with the database
sequelize.sync()
  .then(() => console.log('Database & tables created!'))
  .catch(err => console.error('Failed to sync database:', err));

// Enable CORS
app.use(cors({
  origin: 'http://localhost:3000', // allow only this origin to access the server
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // allow session cookies from browser to pass through
}));

// Init Middleware
app.use(express.json({ extended: false }));

// Define Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/sportlist', require('./routes/sportsList'));
app.use('/api/standings', require('./routes/standings'));
app.use('/api/teams', require('./routes/teams'));
app.use('/api/matches', require('./routes/matches'));
app.use('/api/participants', require('./routes/participants'));
app.use('/api/volleyball', require('./routes/volleyball'));
app.use('/api/soccer', require('./routes/soccer'));
app.use('/api/archive', require('./routes/archive'));
app.use('/api/badminton', require('./routes/badminton'));

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
