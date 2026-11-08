const jwt = require('jsonwebtoken');

// Verify User Token (Cookie or Bearer header)
function authUser(req, res, next) {
    try {
        let token = req.cookies.token;

        if (!token && req.headers.authorization && req.headers.authorization.startsWith('Bearer ')){
            token = req.headers.authorization.split(' ')[1];
        }

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Access denied. Please login to continue."
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;

        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token. Please login again."
        });
    }
}

// Authorize Admin
function authAdmin(req, res, next) {
    if (!req.user || req.user.role !== 'admin') {
        return res.status(403).json({
            success: false,
            message: "Forbidden. Admin privileges required."
        });
    }
    next();
}

module.exports = {
    authUser,
    authAdmin
};
