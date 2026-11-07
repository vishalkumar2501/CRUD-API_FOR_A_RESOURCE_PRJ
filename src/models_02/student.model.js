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
            required: true,
            unique: true
        },
        mobile_no: {
            type: Number,
            required: true,
            unique: true,
            min: 10
        },
        age : {
            type: Number,
            required : true,
            min : 18,
            max : 60
        },
        gender: {
            type: String,
            enum: ['Male', 'Female', 'Other']
        }

        
    });
    