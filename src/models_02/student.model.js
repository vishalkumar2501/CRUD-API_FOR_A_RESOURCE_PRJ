const mongoose = require('mongoose');

// 1. Schema Definition (Data ka Blueprint)
const studentSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Student name is required'],
            trim: true
        },
        email: {
            type: String,
            required: [true, 'Student email is required'],
            unique: true,
            lowercase: true,
            trim: true
        },
        age: {
            type: Number,
            required: [true, 'Student age is required'],
            min: [1, 'Age must be at least 1']
        },
        course: {
            type: String,
            required: [true, 'Course name is required'],
            trim: true
        }
    },
    {
        timestamps: true // Ye automatically createdAt aur updatedAt fields add karega
    }
);

// 2. Model Creation
const Student = mongoose.model('Student', studentSchema);

// 3. Export
module.exports = Student;