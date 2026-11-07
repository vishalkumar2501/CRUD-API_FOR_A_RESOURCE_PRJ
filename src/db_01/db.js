const mongoose = require('mongoose');

async function connectDB () {
    try{
        await mongoose.connect('process.env.MONGO_URI');
        console.log('MongoDB Connected...');
        
    }catch(error){
        console.error('mongoDB connection error', error);
        process.exit(1);
    }
}