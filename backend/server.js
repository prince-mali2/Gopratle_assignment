require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const requirementRoutes = require('./routes/Requirement.routes');

const app = express();

// ---- Middleware ----
app.use(cors()); // allows your Next.js frontend (different origin) to call this API
app.use(express.json()); // parses incoming JSON request bodies

// ---- Routes ----
app.use('/api/requirements', requirementRoutes);

// simple health check — useful to confirm the deployed backend is alive
app.get('/', (req, res) => {
  res.status(200).json({ message: 'GoPratle requirement API is running' });
});

// ---- Error handling for unknown routes ----
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// ---- MongoDB connection + server start ----
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  });