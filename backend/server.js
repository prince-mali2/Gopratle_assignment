require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const requirementRoutes = require('./routes/Requirement.routes');

const app = express();


app.use(cors()); 
app.use(express.json());

// ---- Routes ----
app.use('/api/requirements', requirementRoutes);


app.get('/', (req, res) => {
  res.status(200).json({ message: 'GoPratle requirement API is running' });
});

// for unknow n route
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});


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