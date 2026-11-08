const userModel = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register User
async function registerUser(req, res, next) {
    try {
        const { username, email, password, role } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({
                message: "Username, email, and password are required"
            });
        }

        const sanitizedUsername = username.trim().toLowerCase();
        const sanitizedEmail = email.trim().toLowerCase();

        const isUserExist = await userModel.findOne({
            $or: [{ username: sanitizedUsername }, { email: sanitizedEmail }]
        });

        if (isUserExist) {
            return res.status(400).json({
                message: "User already exists with this email or username"
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await userModel.create({
            username: sanitizedUsername,
            email: sanitizedEmail,
            password: hashedPassword,
            role: role || 'user'
        });

        const token = jwt.sign(
            { id: user._id, role: user.role, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        return res.status(201).json({
            message: "User registered successfully",
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        next(error);
    }
}

// Login User
async function loginUser(req, res, next) {
    try {
        const { username, email, password } = req.body;

        if ((!username && !email) || !password) {
            return res.status(400).json({
                message: "Username/Email and password are required"
            });
        }

        const user = await userModel.findOne({
            $or: [
                { username: username ? username.trim().toLowerCase() : undefined },
                { email: email ? email.trim().toLowerCase() : undefined }
            ]
        });

        if (!user) {
            return res.status(401).json({
                message: "Invalid credentials"
            });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(401).json({
                message: "Invalid credentials"
            });
        }

        const token = jwt.sign(
            { id: user._id, role: user.role, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        return res.status(200).json({
            message: "User logged in successfully",
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        next(error);
    }
}

// Get Logged-in User Profile
async function getProfile(req, res, next) {
    try {
        const user = await userModel.findById(req.user.id).select('-password');
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }
        return res.status(200).json({
            message: "Profile fetched successfully",
            user
        });
    } catch (error) {
        next(error);
    }
}

// Logout User
async function logoutUser(req, res) {
    res.clearCookie('token');
    return res.status(200).json({
        message: "User logged out successfully"
    });
}

module.exports = {
    registerUser,
    loginUser,
    getProfile,
    logoutUser
};
