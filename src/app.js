const express = require('express');
const cookieParser = require('cookie-parser');
const studentRoutes = require('./routes/student.routes');
const { notFoundHandler, errorHandler } = require('./middlewares/error.middleware');

const app = express();

// ---------------------------------------------------------------------------
// 1. GLOBAL MIDDLEWARES
// ---------------------------------------------------------------------------
app.use(express.json());
app.use(cookieParser());

// ---------------------------------------------------------------------------
// 2. ROUTE PREFIX (API Mounting)
// ---------------------------------------------------------------------------
app.use('/api/students', studentRoutes);

// ---------------------------------------------------------------------------
// 3. ERROR HANDLING MIDDLEWARES
// ---------------------------------------------------------------------------
// Route not found handler
app.use(notFoundHandler);

// Centralized error handler (Must be the last middleware)
app.use(errorHandler);

module.exports = app;
