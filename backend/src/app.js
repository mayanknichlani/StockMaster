const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');

const app = express();

// Middleware
app.use(express.json()); // Body parser
app.use(cors()); // Enable CORS

// Mount Routes
app.use('/api/auth', authRoutes);

// Base Route
app.get('/', (req, res) => {
  res.send('StockMaster API is running...');
});

module.exports = app;