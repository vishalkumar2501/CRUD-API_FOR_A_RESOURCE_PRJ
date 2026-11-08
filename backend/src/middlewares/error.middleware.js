// 404 Not Found Middleware
function notFoundHandler(req, res, next) {
    const error = new Error(`Route not found: ${req.originalUrl}`);
    res.status(404);
    next(error);
}

// Centralized Global Error Handler
function errorHandler(err, req, res, next) {
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    let message = err.message || "Internal server error";

    // Invalid ObjectId format (CastError)
    if (err.name === 'CastError') {
        statusCode = 400;
        message = `Invalid ID format: ${err.value}`;
    }

    // Duplicate Key (11000)
    if (err.code === 11000) {
        statusCode = 400;
        const field = Object.keys(err.keyValue)[0];
        message = `Duplicate value entered for ${field} field. Please use another value.`;
    }

    // Mongoose Validation Error
    if (err.name === 'ValidationError') {
        statusCode = 400;
        message = Object.values(err.errors).map(val => val.message).join(', ');
    }

    return res.status(statusCode).json({
        success: false,
        message: message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack
    });
}

module.exports = {
    notFoundHandler,
    errorHandler
};
