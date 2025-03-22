const mongoose = require('mongoose');
require("dotenv").config(); // Load environment variables
const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://iwintuDatabase:Harekrishna@iwintu.fehuq.mongodb.net/shop-backend")
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Error connecting to MongoDB', err));;
    console.log('MongoDB connected');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};

module.exports = connectDB;