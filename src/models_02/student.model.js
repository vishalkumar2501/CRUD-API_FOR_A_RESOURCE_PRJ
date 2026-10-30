const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Student name is required'],
            trim: true,
        },
        email: {
            type: String,
            required: [true, 'Student email is required'],
            unique: true,
            lowercase: true,
            trim: true,
            match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address'],
        },
        age: {
            type: Number,
            required: [true, 'Student age is required'],
            min: [1, 'Age must be at least 1'],
        },
        course: {
            type: String,
            required: [true, 'Course is required'],
            trim: true,
        },
        rollNumber: {
            type: String,
            required: [true, 'Roll number is required'],
            unique: true,
            trim: true,
        },
        phone: {
            type: String,
            trim: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Student', studentSchema);
