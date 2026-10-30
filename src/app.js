const express = require('express');
const cors = require('cors');

const studentRoutes = require('./routes_04/student.routes');
const { notFound, errorHandler } = require('./middleware_05/error.middleware');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Root route
app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Welcome to the Student CRUD API',
    });
});

// Resource routes
app.use('/api/students', studentRoutes);

// Error handling middlewares
app.use(notFound);
app.use(errorHandler);

module.exports = app;
