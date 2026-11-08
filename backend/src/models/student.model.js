const mongoose = require('mongoose');

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
        timestamps: true
    }
);

const studentModel = mongoose.model('Student', studentSchema);

module.exports = studentModel;
