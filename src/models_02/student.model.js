const mongoose = require('mongoose');
// 1. Schema Definition (Data ka Blueprint)
const studentSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Student name is required'],
            trim: true
        },
    

        
        
    });
    