// server.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();

// Middleware
app.use(express.json()); // Parse incoming JSON requests
app.use(cors()); // Enable CORS for all requests

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { // MONGO_URI is a variable in .env
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected!'))
  .catch(err => console.error(err));

// Routes
const todoRoutes = require('./routes/todoRoutes');
app.use('/api', todoRoutes); // Connects frontend and backend, exposing API at /api

// Start the server
const PORT = process.env.PORT || 5000; // Uses the PORT environment variable if set, otherwise defaults to 5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
