const express = require('express');
const cors = require('cors');
const studentRoutes = require('./routes/student.routes');
const errorHandler = require('./middlewares/error.middleware');

const app = express();

// Standard Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check route
app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Welcome to Student CRUD API',
    });
});

// API Routes
app.use('/api/students', studentRoutes);

// 404 Not Found Middleware
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: `Route not found - ${req.originalUrl}`,
    });
});

// Global Error Handler Middleware
app.use(errorHandler);

module.exports = app;
