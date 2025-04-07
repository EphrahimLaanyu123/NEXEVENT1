const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const morgan = require("morgan");

// Load environment variables
dotenv.config();

// Initialize app
const app = express();

// Middleware
app.use(express.json()); // Body parser
app.use(express.urlencoded({ extended: true }));
app.use(cors()); // Enable CORS
app.use(morgan('dev')); // Logging

// Load environment variables
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/nexevent";

// Connect to MongoDB
mongoose.connect(MONGO_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log("MongoDB connection error:", err));

// Import routes
const authRoutes = require('./routes/authRoutes'); 
const signups = require('./routes/signup'); 
const eventRoutes = require('./routes/eventRoutes');

// Use routes
app.use('/api/events', require('./routes/eventRoutes'));
app.use('/api/auth', authRoutes);
app.use('/api/signup', signups);
// Test route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to NexEvent API" });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Something went wrong!" });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});