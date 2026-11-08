const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const studentRoutes = require('./routes/student.routes');
const authRoutes = require('./routes/auth.routes');
const { notFoundHandler, errorHandler } = require('./middlewares/error.middleware');

const app = express();

// Global Middlewares
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Health Check Route
app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Student Management & Auth REST API Server is running!'
    });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/students', studentRoutes);

// Error Handling
app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
